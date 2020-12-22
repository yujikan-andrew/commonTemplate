<template>
  <div id="map"></div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import ol from 'openlayers';
import {Logo, TileSuperMapRest} from '@supermap/iclient-openlayers';

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
        controls: ol.control.defaults({attributionOptions: {collapsed: true}})
            .extend([new ol.supermap.control.Logo()]),
        view: new ol.View({
            center: [11630660.398081223, 4280001.184277043],
            zoom: 4,
            projection: 'EPSG:3857',
            multiWorld: true
        })
    });
    var layer = new ol.layer.Tile({
        source: new ol.source.TileSuperMapRest({
            url: url,
            wrapX: true
        }),
        projection: 'EPSG:3857'
    });
    map.addLayer(layer);
    map.addControl(new ol.supermap.control.ScaleLine());
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
