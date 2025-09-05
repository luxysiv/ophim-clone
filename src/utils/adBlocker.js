export function cleanManifest(manifest, opts = {}) {
  const {
    minSegments = 8,
    maxSegments = 20,
    removeAllDiscontinuity = true,
    maxAvgDuration = 3.0,
    analyzeDurations = true,
    shortDurationThreshold = 2.5,
    minShortRatio = 0.6
  } = opts;

  const lines = manifest.replace(/\r\n/g, '\n').split('\n');
  const discIndices = [];
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '#EXT-X-DISCONTINUITY') {
      discIndices.push(i);
    }
  }

  const toRemove = new Array(lines.length).fill(false);

  for (let p = 0; p < discIndices.length - 1; p++) {
    const startIdx = discIndices[p];
    const endIdx = discIndices[p + 1];

    let segmentCount = 0;
    let totalDuration = 0;
    let shortSegmentCount = 0;
    const segmentDurations = [];

    for (let k = startIdx + 1; k < endIdx; k++) {
      const line = lines[k].trim();
      
      if (/\.ts($|\?)/i.test(line)) {
        segmentCount++;
      }
      
      if (analyzeDurations && line.startsWith('#EXTINF:')) {
        const durationMatch = line.match(/#EXTINF:([\d.]+),/);
        if (durationMatch) {
          const duration = parseFloat(durationMatch[1]);
          totalDuration += duration;
          segmentDurations.push(duration);
          if (duration < shortDurationThreshold) {
            shortSegmentCount++;
          }
        }
      }
    }

    const avgDuration = segmentCount > 0 ? totalDuration / segmentCount : 0;
    const shortRatio = segmentCount > 0 ? shortSegmentCount / segmentCount : 0;

    const isAdBlock = segmentCount >= minSegments && 
                     segmentCount <= maxSegments &&
                     (!analyzeDurations || 
                      avgDuration < maxAvgDuration || 
                      shortRatio >= minShortRatio);

    console.log(`Block ${p + 1}: ${segmentCount} segments, avg: ${avgDuration.toFixed(2)}s, short: ${shortSegmentCount}/${segmentCount}, isAd: ${isAdBlock}`);

    if (isAdBlock) {
      for (let k = startIdx; k <= endIdx; k++) {
        toRemove[k] = true;
      }
    }
  }

  for (let i = 0; i < lines.length; i++) {
    if (/^#EXT-X-KEY:METHOD=NONE\b/i.test(lines[i].trim())) {
      toRemove[i] = true;
    }
  }

  if (removeAllDiscontinuity) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '#EXT-X-DISCONTINUITY') {
        toRemove[i] = true;
      }
    }
  }

  const cleanedLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (!toRemove[i]) {
      let line = lines[i];
      cleanedLines.push(line);
    }
  }

  return cleanedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export async function fetchAndProcessPlaylist(playlistUrl) {
  let req;
  try {
    req = await fetch(playlistUrl);
    if (!req.ok) throw new Error(`Failed to fetch playlist: ${req.statusText}`);
  } catch (error) {
    console.error('Failed to fetch playlist:', error);
    return playlistUrl;
  }

  let playlistText = await req.text();

  playlistText = playlistText.replace(/^[^#].*$/gm, (line) => {
    try {
      const parsedUrl = new URL(line, playlistUrl);
      return parsedUrl.toString();
    } catch {
      return line;
    }
  });

  if (playlistText.includes('#EXT-X-STREAM-INF')) {
    const subPlaylistUrl = playlistText.trim().split('\n').slice(-1)[0];
    return fetchAndProcessPlaylist(subPlaylistUrl);
  }

  const processedPlaylist = cleanManifest(playlistText, {
    minSegments: 10,
    maxSegments: 18,
    removeAllDiscontinuity: true
  });

  const blobUrl = URL.createObjectURL(
    new Blob([processedPlaylist], { type: req.headers.get('Content-Type') ?? 'text/plain' })
  );

  return blobUrl;
    }
