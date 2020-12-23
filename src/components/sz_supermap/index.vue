<template>
  <div id="map"></div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import TileSuperMapRest from './tile_supermap_rest.js';

export default {
  name: "szSperMap",
  props: {},
  components: {},
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapGetters([
        'user'
    ])
  },
  filters: {},
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        
      }
    }
  },
  mounted() {
    var map, url = "https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China";
    map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults().extend([
          new ol.control.ScaleLine({
            target: document.getElementById('scaleline')
          })
        ]),
        view: new ol.View({
            center: [11630660.398081223, 4280001.184277043],
            zoom: 4,
            projection: 'EPSG:3857',
            multiWorld: true
        })
    });
    var layer = new ol.layer.Tile({
        source: new TileSuperMapRest({
            url: url,
            wrapX: true
        }),
        projection: 'EPSG:3857'
    });
    map.addLayer(layer);
  },
  methods: {

  }
}
</script>
<style 
  lang="less" scoped>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
