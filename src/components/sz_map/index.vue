<template>
  <div id="map" class="map">
    
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  props: {},
  components: {},
  data() {
    return {
      showVector: true,
      VECTOR_ZINDEX: 10,
    }
  },
  computed: {
    ...mapGetters([
        'userInfo'
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
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.tdtVecLayer = new ol.layer.Tile({
        title: "矢量数据",
        visible: this.showVector,
        source: new ol.source.XYZ({
          url: defineUrl("vec")
        }),
        zIndex: this.BASE_ZINDEX
      });

      this.tdtImgLayer = new ol.layer.Tile({
        title: "影像数据",
        visible: !this.showVector,
        source: new ol.source.XYZ({
          url: defineUrl("img")
        }),
        zIndex: this.BASE_ZINDEX
      });
      
      this.googleImgLayer = new ol.layer.Tile({
        title: "谷歌影像未加密地图",
        visible: !this.showVector,
        source: new ol.source.XYZ({url: 'http://mt{1-3}.google.cn/maps/vt?lyrs=s@189&x={x}&y={y}&z={z}'}),
        zIndex: this.BASE_ZINDEX
      });

      var tdtCvaLayer = new ol.layer.Tile({
        title: "文字注记",
        source: new ol.source.XYZ({
          url: defineUrl("cva")
        }),
        zIndex: this.CVA_ZINDEX
      });

      function defineUrl(layerType) {
        return "http://t{0-7}.tianditu.com/DataServer?tk=ab1d209458f4df377db58f783365628b&T=" + layerType + "_w&x={x}&y={y}&l={z}";
      }

      this.map = new ol.Map({
        target: this.$el,
        interactions : ol.interaction.defaults({doubleClickZoom :false}),
        layers: [this.tdtVecLayer, this.googleImgLayer, tdtCvaLayer],
        controls: ol.control.defaults().extend([
          new ol.control.ScaleLine({
            target: document.getElementById('scaleline')
          })
        ]),
        view: new ol.View({
          center: ol.proj.fromLonLat([104.48, 39.85]),
          zoom: 4,
          minZoom: 2,
          maxZoom: 18
        })
      });

      this.doubleClickZoom(true);
      this.$emit('initMap', this.map)

      this.map.on("moveend", (e)=> {
        this.map.getViewport().style.cursor = '-webkit-grab';
      })
      this.map.on("pointermove", (e)=> {
        if (e.dragging) {
          this.map.getViewport().style.cursor = '-webkit-grabbing';
        } else {
          this.map.getViewport().style.cursor = '-webkit-grab';
        }
      })
    },
    // 底图切换
    switchBaseMap(showVector) {
      this.showVector = showVector
    },
    
    // 添加 geoserver
    // 添加 supermap
    
    // 添加矢量
        
    getFeature(geometry, properties) {
      var feature = new ol.Feature({
        geometry, properties
      })

      return feature
    },
    getVectorFeature(geom, properties, transform) {
      var geometry = new ol.geom[geom.type](geom.coordinates)
      if (transform) {
        geometry.applyTransform(ol.proj.getTransform("EPSG:4326", "EPSG:3857"))
      }

      return this.getFeature(geometry, properties)
    },
    getVectorLayer(features, style, zIndex=this.VECTOR_ZINDEX, interactive=true) {
      var source

      if (features instanceof ol.source.Cluster) {
        source = features

      } else {
        source = new ol.source.Vector({
          features: features
        });
      }

      var layer = new ol.layer.Vector({
        source: source,
        style: style,
        zIndex
      })
      layer.set("interactive", interactive)

      return layer
    },
    // 点击、hover 事件
    // const clickHandler = (event) => {
    //   let pixel = map.getEventPixel(event.originalEvent);
      
    //   map.forEachFeatureAtPixel(pixel, function (feature, layer) {  // 鼠标所在位置的图层、要素
    //     if(feature && feature.getProperties().properties) {
    //       selectedId = feature.getProperties().properties.id
    //       pointLayer.changed()
    //     }
    //   }, {
    //     // 过滤是否为点图层
    //     layerFilter: function layerFilter(layer) {
    //       return layer === pointLayer;
    //     }
    //   })
    // };
    // // 鼠标滑过方法
    // const hoverHandler = (event) => {
    //   let pixel = map.getEventPixel(event.originalEvent);
    //   let _feature = null
      
    //   map.forEachFeatureAtPixel(pixel, function (feature, layer) {
    //     if(feature && feature.getProperties().properties) {
    //       _feature = feature
    //     } 
        
    //   }, {
    //     layerFilter: function layerFilter(layer) {
    //       return layer === pointLayer;
    //     }
    //   })
    //   if (_feature) {
    //     map.getViewport().style.cursor = 'pointer'
    //   } else {
    //     map.getViewport().style.cursor = 'default'
    //   }
    // };
    // // 注册事件
    // map.on('click', clickHandler);
    // map.on('pointermove', hoverHandler);
    // 坐标系转化
    // 定位到
    // 添加 overlay
    // 
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