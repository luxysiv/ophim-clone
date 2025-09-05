<template>
  <v-col cols="12" class="text-center" v-if="isLoading">
    <v-progress-circular indeterminate color="primary" size="50" />
  </v-col>

  <div v-else>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-row dense>
      <v-col cols="12" md="10">
        <div class="video-wrapper">
          <video id="videoPlayer" class="w-full h-full" controls autoplay @ended="handleVideoEnd"></video>
        </div>

        <div
          class="d-flex align-center justify-space-between flex-wrap px-4 py-2"
          style="background-color: #1a1a1a"
        >
          <div class="d-flex align-center flex-wrap" style="gap: 16px">
            <v-btn variant="text" @click="getTrailer()">
              <v-icon start icon="mdi-youtube" />
              Trailer
            </v-btn>
            <v-btn variant="text" @click="shareMovie"><v-icon start icon="mdi-share-variant" />{{ $t('Chia sẻ') }}</v-btn>
          </div>

          <div class="d-flex align-center" style="gap: 8px">
            <v-btn
              v-if="currentEpisodeIndex > 0"
              variant="flat"
              @click="handlePreviousEpisode"
              class="d-flex align-center"
            >
              <v-icon start>mdi-arrow-left</v-icon> {{ `Tập ${currentEpisodeIndex}` }}
            </v-btn>
            <v-btn
              v-if="currentEpisodeIndex < movie.pageMovie.length - 1"
              variant="flat"
              @click="handleNextEpisode"
              class="d-flex align-center"
            >
              {{ `Tập ${currentEpisodeIndex + 2}` }} <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
          
          <div class="d-flex" style="gap: 8px">
            <v-tabs v-model="tabserver" class="custom-tabs" background-color="transparent">
              <v-tab
                v-for="(server, index) in movie.servers"
                :key="index"
                @click="switchServer(server, index)"
                :class="{ 'active-tab': tabserver === index }"
              >
                {{ server.server_name || `Server ${index + 1}` }}
              </v-tab>
            </v-tabs>
          </div>
        </div>

        <v-card class="my-4" variant="flat" color="grey-darken-4" theme="dark">
          <v-card-title class="d-flex align-center">
            <span class="text-h6">{{ movie.title }}</span>
            <v-chip class="ml-2" color="red" text-color="white">{{ movie.page }}</v-chip>
            <v-chip
              class="ml-2"
              color="red"
              text-color="white"
              v-if="typeof movie.page === 'string' && movie.page.toUpperCase().includes('HOÀN TẤT')"
            >
              {{ $t('Tập ') }}1
            </v-chip>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="(episode, index) in movie.pageMovie" :key="index" cols="auto" class="pa-2">
                <v-btn color="primary" @click="playEpisode(episode)">
                  {{ `Tập ${episode.name}` || `Tập ${index + 1}` }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        
        <v-card class="pa-6 text-left" color="grey-darken-4" variant="flat" rounded="lg" theme="dark">
          <v-card-title class="text-white mb-4">{{ movie.title }} ( {{ movie.name }})</v-card-title>
          <v-card-text class="text-grey-lighten-2" v-html="movie.description"></v-card-text>
          <v-card-text class="text-white">
            <p><strong>{{ $t('Diễn viên') }}:</strong> {{ movie.actors.join(', ') }}</p>
            <p><strong>{{ $t('Đạo diễn') }}:</strong> {{ movie.director.join(', ') }}</p>
            <p><strong>{{ $t('Thể loại') }}:</strong> {{ movie.genre.name }}</p>
            <div class="d-flex align-center">
              <strong class="mr-2">{{ $t('Đánh giá') }}:</strong>
              <v-rating
                readonly
                :length="5"
                :size="28"
                :model-value="movie.rating"
                active-color="yellow-darken-2"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="2" v-show="$vuetify.display.mdAndUp">
        <v-card class="pa-0" color="grey-darken-4" flat>
          <v-tabs v-model="tab" background-color="grey-darken-3" grow>
            <v-tab value="1">{{ $t('Gợi ý cho bạn') }}</v-tab>
            <v-tab value="2">{{ $t('Top phim') }}</v-tab>
          </v-tabs>

          <v-card-text style="max-height: 87vh; overflow-y: auto">
            <v-list dense nav>
              <v-list-item v-for="suggested in suggestedMovies" :key="suggested.id" class="suggested-item">
                <router-link
                  :to="{
                    name: 'MovieDetail',
                    params: { slug: suggested.slug },
                  }"
                  class="text-decoration-none"
                >
                  <v-list-item-avatar size="80">
                    <v-img :src="getOptimizedImage(suggested.poster_url)" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="text-white text-wrap text-body-2">
                      {{ suggested.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-grey-lighten-1 text-caption">
                      {{ suggested.episode_current }} | {{ suggested.lang }}<br />
                      {{ suggested.category[0]?.name }} • {{ suggested.year }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </router-link>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <div class="suggested-movies my-8">
        <h2 class="text-h5 mb-4">🎬 {{ $t('Phim được đề xuất') }}</h2>
        <v-row>
          <v-col v-for="suggested in suggestedMovies" :key="suggested.id" cols="6" sm="4" md="2">
            <router-link
              :to="{ name: 'MovieDetail', params: { slug: suggested.slug } }"
              class="text-decoration-none"
            >
              <v-card elevation="2" class="bg-grey-darken-4" hover>
                <v-img :src="getOptimizedImage(suggested.poster_url)" aspect-ratio="16/9" cover></v-img>
                <v-card-title class="text-white text-body-2 text-wrap">
                  {{ suggested.name }}
                </v-card-title>
                <v-card-subtitle class="text-grey-lighten-1 text-caption px-4 pb-4">
                  {{ suggested.episode_current }} | {{ suggested.lang }}<br />
                  {{ suggested.category[0]?.name }} • {{ suggested.year }}
                </v-card-subtitle>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </div>
    </v-row>

    <v-dialog v-model="shareDialog" max-width="500">
      <v-card class="pa-4" style="background-color: #1e1e1e; color: white">
        <v-card-title class="text-h6 justify-center">Chia sẻ</v-card-title>
        
        <v-card
          class="mt-4 px-3 py-2 d-flex align-center"
          style="background-color: #2a2a2a; border-radius: 8px"
        >
          <span class="text-truncate" style="color: #facc15; max-width: 100%">
            {{ shareUrl }}
          </span>
          <v-spacer />
          <v-btn icon @click="copyLink" size="small">
            <v-icon icon="mdi-content-copy" />
          </v-btn>
        </v-card>

        <v-btn icon class="position-absolute" style="top: 8px; right: 8px" @click="shareDialog = false">
          <v-icon icon="mdi-close" />
        </v-btn>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="mess" :timeout="3000" :color="color">
      {{ Message }}
    </v-snackbar>
  </div>
</template>

<script>
import Hls from 'hls.js';
import { MoveInfor, ListMovieByCate, urlImage } from '@/model/api';
import { fetchAndProcessPlaylist } from '@/utils/adBlocker';

export default {
  name: 'MovieDetail',
  data() {
    return {
      tab: '',
      shareUrl: window.location.href,
      tabserver: null,
      items: [
        {
          title: 'Home',
          disabled: false,
          href: '/home',
        },
      ],
      isLoading: true,
      Message: '',
      color: '',
      mess: false,
      movie: {
        title: '',
        valueRate: 4.5,
        description: '',
        videoUrl: '',
        actors: [],
        director: [],
        servers: [],
        genre: '',
        pageMovie: [],
        page: 1,
        rating: 5,
        categoris: '',
        trailer_url: '',
        name: '',
        currentEpisode: null,
        poster_url: '',
        year: null,
        quality: '',
        episode_current: '',
        lang: '',
        origin_name: '',
      },
      idMovie: '',
      isTrailer: false,
      urlImage: urlImage,
      suggestedMovies: [],
      shareDialog: false,
      hls: null,

      historyKey: 'watchHistory',
      lastViewedPosition: 0,
      lastViewedEpisodeInfo: null,
      saveInterval: null,
      PLAYBACK_SAVE_THRESHOLD_SECONDS: 5,
      SAVE_INTERVAL_SECONDS: 10,
      currentEpisodeIndex: -1,
      episodeSlug: this.$route.query.tap,
    };
  },
  props: ['slug'],
  watch: {
    slug(newSlug) {
      this.items = [{ title: 'Home', disabled: false, href: '/home' }];
      this.MoveInfor(newSlug);
      this.ListMovieByCate();
    },
    'movie.videoUrl'(newUrl) {
      if (newUrl) {
        this.$nextTick(() => {
          this.loadVideo(newUrl);
        });
      }
    },
    'movie.currentEpisode'(newEpisode) {
        if (newEpisode && this.movie.pageMovie) {
            const index = this.movie.pageMovie.findIndex(ep => ep.slug === newEpisode.slug);
            this.currentEpisodeIndex = index;
        } else {
            this.currentEpisodeIndex = -1;
        }
    }
  },
  mounted() {
    this.MoveInfor(this.slug);
    this.ListMovieByCate();
    window.addEventListener('beforeunload', this.savePlaybackState);
  },
  beforeUnmount() {
    this.savePlaybackPosition();
    window.removeEventListener('beforeunload', this.savePlaybackState);
    if (this.hls) {
      this.hls.destroy();
    }
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
    }
  },
  methods: {
    async loadVideo(url) {
      const video = document.getElementById('videoPlayer');
      if (!video) {
        console.error('Video element not found!');
        return;
      }

      if (this.saveInterval) {
        clearInterval(this.saveInterval);
      }
      if (this.hls) {
        this.hls.destroy();
      }

      const oldIframe = document.querySelector('.video-wrapper iframe');
      if (oldIframe) {
        oldIframe.remove();
      }

      const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
      if (youtubeMatch) {
        video.style.display = 'none';
        const wrapper = document.querySelector('.video-wrapper');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        wrapper.appendChild(iframe);
      } else if (Hls.isSupported()) {
        video.style.display = 'block';
        
        const processedUrl = await fetchAndProcessPlaylist(url);
        
        this.hls = new Hls();
        this.hls.loadSource(processedUrl);
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const history = JSON.parse(localStorage.getItem(this.historyKey) || '[]');
          const currentMovieHistory = history.find(item => item.slug === this.slug);
          if (currentMovieHistory && currentMovieHistory.episode.slug === this.movie.currentEpisode.slug) {
            video.currentTime = currentMovieHistory.position;
          } else {
            video.currentTime = 0;
          }
          video.play().catch(e => console.error("Video playback failed:", e));
        });
        this.hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS error:', data);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.style.display = 'block';
        video.src = url;
        video.addEventListener('loadedmetadata', function() {
          video.play().catch(e => console.error("Video playback failed:", e));
        });
      }

      this.saveInterval = setInterval(() => {
        this.savePlaybackPosition();
      }, this.SAVE_INTERVAL_SECONDS * 1000);
    },
    MoveInfor(slug) {
      MoveInfor(
        slug,
        (result) => {
          if (result.status == true) {
            const history = JSON.parse(localStorage.getItem(this.historyKey) || '[]');
            const currentMovieHistory = history.find(item => item.slug === slug);
            if (currentMovieHistory) {
              this.lastViewedPosition = currentMovieHistory.position;
              this.lastViewedEpisodeInfo = currentMovieHistory.episode;
              this.tabserver = currentMovieHistory.serverIndex;
            } else {
              this.lastViewedPosition = 0;
              this.lastViewedEpisodeInfo = null;
              this.tabserver = 0;
            }

            let initialVideoUrl = '';
            let initialEpisodePage = '';
            let initialEpisode = null;
            
            this.movie.servers = result.episodes;
            const serverData = result.episodes[this.tabserver]?.server_data;

            if (currentMovieHistory) {
              initialEpisode = serverData?.find(ep => ep.slug === currentMovieHistory.episode.slug);
            }
            
            if (!initialEpisode) {
              const tapFromUrl = this.$route.query.tap;
              initialEpisode = serverData?.find(ep => ep.slug === tapFromUrl);
            }
            
            if (!initialEpisode && serverData && serverData.length > 0) {
              initialEpisode = serverData[0];
            }

            if (initialEpisode) {
              initialVideoUrl = initialEpisode.link_m3u8;
              initialEpisodePage = initialEpisode.name || `Tập ${serverData.indexOf(initialEpisode) + 1}`;
              this.movie.currentEpisode = initialEpisode;
            }
            
            this.movie.videoUrl = initialVideoUrl;
            this.movie.page = `Tập ${initialEpisodePage}`;
            this.idMovie = result.movie._id;
            this.movie.title = result.movie.origin_name;
            this.movie.description = result.movie.content;
            this.movie.pageMovie = serverData;
            this.movie.director = result.movie.director;
            this.movie.trailer_url = result.movie.trailer_url;
            this.movie.name = result.movie.name;
            this.movie.poster_url = result.movie.poster_url;
            this.movie.year = result.movie.year;
            this.movie.quality = result.movie.quality;
            this.movie.episode_current = result.movie.episode_current;
            this.movie.lang = result.movie.lang;
            this.movie.origin_name = result.movie.origin_name;


            if (result.movie.status == 'trailer' || !initialVideoUrl) {
              this.movie.videoUrl = result.movie.trailer_url;
              this.isTrailer = true;
            }

            this.movie.actors = result.movie.actor;
            for (var i = 0; i < result.movie.country.length; i++) {
              this.movie.genre = result.movie.country[i];
            }
            this.movie.categoris = result.movie.category[0].slug;

            this.items.push({
              title: result.movie.origin_name,
              disabled: true,
            });

            this.isLoading = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getOptimizedImage(imagePath) {
      return `${this.urlImage + encodeURIComponent(imagePath)}&w=384&q=100`;
    },
    updateMetaTags(seo) {
      document.title = seo.titleHead || 'Phim hay';
      const removeOldMeta = (key, attr = 'name') => {
        const old = document.querySelectorAll(`meta[${attr}="${key}"]`);
        old.forEach((tag) => tag.remove());
      };
      const setMeta = (key, content, attr = 'name') => {
        if (!content) return;
        const meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      };
      removeOldMeta('description');
      removeOldMeta('og:title', 'property');
      removeOldMeta('og:description', 'property');
      removeOldMeta('og:type', 'property');
      removeOldMeta('og:image', 'property');
      setMeta('description', seo.descriptionHead);
      setMeta('og:title', seo.titleHead, 'property');
      setMeta('og:description', seo.descriptionHead, 'property');
      setMeta('og:type', seo.og_type || 'website', 'property');
      if (Array.isArray(seo.og_image)) {
        seo.og_image.forEach((img) => {
          setMeta('og:image', img, 'property');
        });
      }
    },
    ListMovieByCate() {
      ListMovieByCate(
        this.movie.categoris,
        (data) => {
          if (data.status == 'success') {
            this.suggestedMovies = data.data.items;
            this.isLoading = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    shareMovie() {
      this.shareDialog = true;
    },
    copyLink() {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert(this.$t('Đã sao chép liên kết!'));
      });
    },
    getTrailer() {
      this.movie.videoUrl = this.movie.trailer_url;
      this.movie.currentEpisode = null;
      this.isTrailer = true;
      this.movie.page = 'Trailer';
      this.$router.push({ name: 'MovieDetail', params: { slug: this.slug }, query: { tap: 'trailer' } });
      this.scrollToPlayer();
    },
    playEpisode(episode) {
      this.isLoading = true;
      this.movie.videoUrl = episode.link_m3u8;
      this.movie.page = episode.name ? `Tập ${episode.name}` : `Tập ${this.movie.pageMovie.indexOf(episode) + 1}`;
      this.movie.currentEpisode = episode;
      this.isTrailer = false;
      this.isLoading = false;
      this.$router.push({ name: 'MovieDetail', params: { slug: this.slug }, query: { tap: episode.slug } });
      this.scrollToPlayer();
    },
    switchServer(server, index) {
      this.isLoading = true;
      this.savePlaybackPosition();
      this.movie.pageMovie = server.server_data;
      
      const currentTap = this.movie.currentEpisode?.slug || server.server_data[0].slug;
      const data = server.server_data.find((ep) => ep.slug === currentTap);

      if (data) {
        this.movie.videoUrl = data.link_m3u8;
        this.isTrailer = false;
        this.movie.currentEpisode = data;
      } else {
        this.movie.videoUrl = server.server_data[0].link_m3u8;
        this.isTrailer = false;
        this.movie.currentEpisode = server.server_data[0];
      }
      
      this.$router.push({
        name: 'MovieDetail',
        params: { slug: this.slug },
        query: { tap: this.movie.currentEpisode.slug },
      });
      
      this.tabserver = index;
      this.isLoading = false;
      this.scrollToPlayer();
    },
    updateHistoryEntry(movieData, episodeData, position, serverIndex) {
      if (!movieData || !episodeData) return;
      let history = JSON.parse(localStorage.getItem(this.historyKey) || '[]');
      
      let historyEntry = history.find((item) => item.slug === this.slug);

      if (historyEntry) {
        historyEntry.episode = { slug: episodeData.slug, name: episodeData.name };
        historyEntry.position = Math.floor(position);
        historyEntry.serverIndex = serverIndex;
        historyEntry.timestamp = Date.now();
      } else {
        historyEntry = {
          slug: this.slug,
          name: movieData.name,
          origin_name: movieData.origin_name,
          poster_url: movieData.poster_url,
          year: movieData.year,
          quality: movieData.quality,
          episode_current: movieData.episode_current,
          episode: { slug: episodeData.slug, name: episodeData.name },
          position: Math.floor(position),
          serverIndex: serverIndex,
          timestamp: Date.now(),
        };
      }

      history = history.filter((item) => item.slug !== this.slug);
      history.unshift(historyEntry);
      
      try {
        localStorage.setItem(this.historyKey, JSON.stringify(history.slice(0, 20)));
      } catch (e) {
        console.warn('LocalStorage quota exceeded, clearing old history');
        localStorage.removeItem(this.historyKey);
        localStorage.setItem(this.historyKey, JSON.stringify([historyEntry]));
      }
    },
    savePlaybackPosition() {
      const video = document.getElementById('videoPlayer');
      if (video && !video.paused && this.movie && this.movie.currentEpisode && video.currentTime > this.PLAYBACK_SAVE_THRESHOLD_SECONDS) {
        this.updateHistoryEntry(this.movie, this.movie.currentEpisode, video.currentTime, this.tabserver);
      }
    },
    handleNextEpisode() {
      if (this.currentEpisodeIndex !== -1 && this.currentEpisodeIndex < this.movie.pageMovie.length - 1) {
        const nextEpisode = this.movie.pageMovie[this.currentEpisodeIndex + 1];
        this.playEpisode(nextEpisode);
      }
    },
    handlePreviousEpisode() {
      if (this.currentEpisodeIndex > 0) {
        const prevEpisode = this.movie.pageMovie[this.currentEpisodeIndex - 1];
        this.playEpisode(prevEpisode);
      }
    },
    handleVideoEnd() {
      setTimeout(() => {
        this.handleNextEpisode();
      }, 500);
    },
    scrollToPlayer() {
      const playerElement = document.querySelector('.video-wrapper');
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  },
};
</script>

<style scoped>
/* Các style khác không thay đổi */
.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
  position: relative;
  overflow: hidden;
}

.video-wrapper iframe,
.video-wrapper video {
  width: 100%;
  height: 100%;
}
.suggested-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 8px;
}

.text-wrap {
  white-space: normal !important;
  overflow-wrap: break-word;
}

.suggested-item:hover {
  background-color: #2e2e2e;
}

.movie-detail {
  padding: 12px 0;
}
a {
  color: #fff;
}
.custom-tabs .v-tab {
  color: white;
  background-color: transparent;
  border-radius: 8px;
  transition: all 0.3s;
}
.custom-tabs .v-tab.active-tab {
  color: #000;
  background-color: #f8b230;
  border-radius: 5px;
  font-weight: bold;
}

.movie-info p {
  margin-bottom: 8px;
}

.scroll-container {
  scroll-behavior: smooth;
  gap: 16px;
}

.movie-card-link {
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position-absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}
.suggested-slide-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
  scroll-behavior: smooth;
}

.suggested-slide {
  display: flex;
  gap: 16px;
  transition: transform 0.3s ease-in-out;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.movie-card {
  flex: 0 0 auto;
  width: 200px;
  background-color: #2e2e2e;
  border-radius: 12px;
  overflow: hidden;
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.card-inner {
  position: relative;
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 300px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.movie-card:hover .card-image {
  transform: scale(1.05);
}

.card-hover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  padding: 8px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.movie-card:hover .card-hover-overlay {
  transform: translateY(0);
}

.card-title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info {
  padding: 12px;
  color: #ccc;
}

.episode-chip {
  display: inline-block;
  background-color: #ffd600;
  color: black;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 6px;
}

.origin {
  font-weight: bold;
  color: #fff;
}

.meta {
  font-size: 0.8rem;
  color: #aaa;
}

/* Nút điều hướng trái phải */
.nav-btn {
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 24px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 50%;
  user-select: none;
  transition: background-color 0.3s ease;
  z-index: 10;
  flex-shrink: 0;
}

.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.nav-btn.left {
  margin-right: 8px;
}

.nav-btn.right {
  margin-left: 8px;
}
</style>
