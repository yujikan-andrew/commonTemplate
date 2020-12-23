<template>
  <div class="map-container">
    <sz-map ref="map"></sz-map>

    <div id="overlayEl" class="ps">overlay text</div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  name: "map_test",
  props: {},
  components: {
  },
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
    this.styleCache = {}
    // point example
    this.renderPoint()
    this.renderClusterPoint()

  },
  methods: {
    renderPoint() {
      var geom = {type: "MultiPoint", coordinates: [[120.3, 35.5], [121.3, 32.5]]}
      var transform = true
      var fe = this.$refs.map.getVectorFeature(geom, {id: 1, name: "多个点属性一致"}, transform)
      console.log('getGeomExtent', this.$refs.map.getGeomExtent(fe.getGeometry()))
      fe.setId(1)
      // var style = new ol.style.Style({
      //   image: new ol.style.Circle({
      //     fill: new ol.style.Fill({
      //      color: 'rgba(255,255,255,0.4)'
      //     }),
      //     stroke: new ol.style.Stroke({
      //      color: '#3399CC',
      //      width: 1.25
      //     }),
      //     radius: 5
      //   }),
      // })
      var style =  new ol.style.Style({
          image: new ol.style.Icon({
            src: require('@/assets/logo.png'),
            scale: 0.1
          }),
          zIndex: 13
        })
      var la = this.$refs.map.getVectorLayer([fe], style, 100)
      this.$refs.map.addLayer(la)

      // 需要先  fe.setId(1)
      var _fe = this.$refs.map.layerGetFeatureById(la, 1)
      console.log("layerGetFeatureById", _fe)

      this.$refs.map.layerForEachFeature(la, (feature)=> {
        console.log("layerForEachFeature", feature)
      })
    },
    renderClusterPoint() {
      var coordinates = [[125.3, 35.5], [121.3, 34.5]]
      var features = []
      var transform = true
      for (let i = 0; i < coordinates.length; i++) {
        var geom = { type: "Point", coordinates: coordinates[i]}
        var fe = this.$refs.map.getVectorFeature(geom, {name: "属性不一致" + i}, transform)
        features.push(fe)
      }

      var style = (feature)=> {
          var size = feature.get('features').length;
          var style = this.styleCache[size];
          if (!style) {
            style = new ol.style.Style({
              image: new ol.style.Circle({
                radius: 10,
                stroke: new ol.style.Stroke({
                  color: '#fff'
                }),
                fill: new ol.style.Fill({
                  color: '#3399CC'
                })
              }),
              text: new ol.style.Text({
                text: size.toString(),
                fill: new ol.style.Fill({
                  color: '#fff'
                })
              })
            });
            this.styleCache[size] = style;
          }
          return style;
        }
      var layer = this.$refs.map.getClusterLayer(features, style, 100)
      this.$refs.map.addLayer(layer)

      this.$refs.map.layerOnClick(layer, (features, event, layer)=> {
        if (features.length > 0) {
          var prop = features[0].getProperties()
          if (prop.features.length > 0) {
            for (var i = 0; i < prop.features.length; i++) {
              console.log(`layerOnClick 第 ${i} 个`, prop.features[i].getProperties().properties.name)
              features[i] && this.addOverlay(features[i], event)
            }
          }
        }
      })
    },
    addOverlay(feature, event) {
      var coordinates = feature.getGeometry().getCoordinates()
      var element = document.getElementById("overlayEl")

      this.overlay = this.$refs.map.addOverlay(coordinates, element, this.overlay)
    }
  }
}
</script>
<style 
  lang="less" scoped>
  .map-container {
    height: 100%;
  }
</style>