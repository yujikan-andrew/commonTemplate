<template>
  <div id="map" class="map">
    
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  name: "szMap",
  props: {},
  components: {},
  data() {
    return {
      showVector: true,
      BASE_ZINDEX: 1,
      CVA_ZINDEX: 2,
      DEFAUL_ZINDEX: 5,
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
          center: ol.proj.fromLonLat([104.48, 35.85]),
          zoom: 4,
          minZoom: 2,
          maxZoom: 18
        })
      });

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
      this.tdtVecLayer.setVisible(showVector)
      this.googleImgLayer.setVisible(!showVector)
    },
    
    // 获取矢量要素、几何对象、图层
    _getFeature(geometry, properties) {
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
      
      return this._getFeature(geometry, properties)
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
    getClusterLayer(features, style, distance=100, zIndex=this.VECTOR_ZINDEX) {
      var source = new ol.source.Cluster({
        distance,
        source: new ol.source.Vector({ features })
      });

      var clustersLayer = this.getVectorLayer(source, style, zIndex)

      return clustersLayer
    },

    // find feature
    layerGetFeatureById(layer, id) {
      if (layer && layer.getSource()) {
        var source = layer.getSource()
        if (source instanceof ol.source.Cluster) {
          source = source.getSource()
        }

        return source.getFeatureById(id)
      }
    },
    layerForEachFeature(layer, eachFeatureFun) {
      if (layer && layer.getSource()) {
        var source = layer.getSource()
        
        eachFeatureFun && source.forEachFeature(eachFeatureFun)
      }
    },
    // 点击、hover 事件
    
    _getMatchedFeatures(event, layer, multiple, bubble) {
      var pixel = this.map.getEventPixel(event.originalEvent)
      
      var features = []
      var layers = []
      var matched = []
      var maxzIndex = -1
      
      this.map.forEachFeatureAtPixel(pixel, function (feature, _layer) {
        if (_layer && _layer.get("interactive")) {  // layer exist and layer can interactive
          
          if (bubble) {
            let curzIndex = _layer.getZIndex()
            maxzIndex = curzIndex > maxzIndex ? curzIndex : maxzIndex
            
            matched[matched.length] = {zIndex: curzIndex, feature, _layer}

          } else {
            features.push(feature)
            layers.push(_layer)
            
            if (!multiple) {
              return true
            }
          }
        }
      }, {
        layerFilter(_layer) {
          return bubble || _layer === layer
        }
      });

      if (bubble) {
        for (var i = 0; i < matched.length; i++) {
          if (matched[i].zIndex === maxzIndex) {
            features.push(matched[i].feature)
            layers.push(matched[i]._layer)
            if (!multiple) {
              break
            } 
          }
        }
        maxzIndex = -1
        matched = []
      }

      return {features, layers}
    },
    layerOnClick(layer, callback, multiple, bubble) {
      this._removeClickEvent(layer)
      var clickHandler = (event)=> {
        var result = this._getMatchedFeatures(event, layer, multiple, bubble)
        callback && callback(result.features, event, result.layers)
      }

      layer.set("clickHandler", clickHandler)
      this.map.on('click', clickHandler)

      return clickHandler
    },
    layerUnClick(clickHandler) {
      this.map.un('click', clickHandler)
      clickHandler = null
    },
    layerOnHover(layer, callback, multiple, bubble) {
      this._removeHoverEvent(layer)
      var hoverHandler = (event)=> {

        if (event.dragging) {
          return

        } else {
          var result = this._getMatchedFeatures(event, layer, multiple, bubble)
          callback && callback(result.features, event, result.layers)
        }
      }

      layer.set("hoverHandler", hoverHandler)
      this.map.on('pointermove', hoverHandler)

      return hoverHandler
    },
    layerUnHover(hoverHandler) {
      this.map.un('pointermove', hoverHandler)
      hoverHandler = null
    },
    _removeClickEvent(layer) {
      var clickEvt = layer.get("clickHandler")
      
      if (clickEvt && typeof clickEvt === "function") {
        this.map.un("click", layer.get("clickHandler"))
        layer.set("clickHandler", null)
      }
    },
    _removeHoverEvent(layer) {
      var hoverEvt = layer.get("hoverHandler")
      
      if (hoverEvt && typeof hoverEvt === "function") {
        this.map.un("pointermove", layer.get("hoverHandler"))
        layer.set("hoverHandler", null)
      }
    },
    // 坐标系转化、定位到、添加 overlay等常用方法
    addLayer(layer) {
      this.map.addLayer(layer)
      return layer
    },
    removeLayer(layer) {
      this.map.removeLayer(layer)
      return layer
    },
    removeLayers(layers) {
      if (typeof layers === "array" && layers.length > 0) {
        for (var i = 0; i < layers.length; i++) {
          this.map.removeLayer(layers[i])
        }
        return []
      }
    },
    renderSync() {
      this.map.renderSync()
    },
    updateSize() {
      this.map.updateSize()
    },
    fit(extent) {
      this.getView().fit(extent)
    },
    getView() {
      return this.map.getView()
    },
    getSize() {
      return this.map.getSize()
    },
    toLonLat(coordinate) {
      return ol.proj.toLonLat(coordinate)
    },
    getCoordinateFromPixel(pixel) {
      return this.map.getCoordinateFromPixel(pixel)
    },
    transform(coordinate) {
      return ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857')
    },
    extransform(coordinate) {
      return ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')
    },
    applyTransform(extent) {
      var result = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
      return result
    },
    applyExtransform(extent) {
      var result = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:3857", "EPSG:4326"));
      return result
    },
    calculateExtent() {
      var size = this.getSize(),
        extent = this.getView().calculateExtent(size);

      return extent
    },
    getGeomExtent(geometry) {
      var extent = []
      if (geometry) {
        extent = geometry.getExtent()
      }

      return extent
    },
    pointInGeom(geometry, coordinate, transform) {
      var intersect = false
      coordinate = transform ? this.transform(coordinate) : coordinate

      if (geometry) {
        intersect = geometry.intersectsCoordinate(coordinate)
      }

      return intersect
    },

    addOverlay(coordinate, element, overlay=null, insertFirst=true) {
      if (!overlay) {
        overlay = new ol.Overlay({
          element,
          insertFirst
        });
        this.map.addOverlay(overlay);
      }
      
      overlay.setPosition(coordinate)
      this.map.renderSync()
      return overlay
    },

    // clip methods 前端裁剪
    getClipFeature(geom) {
      var gsForamt = new ol.format.GeoJSON();
      var features = [{'type': 'Feature', 'geometry': geom}];

      var geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857'
            }
        },
        'features': features
      };

      var fs = gsForamt.readFeatures(geojsonObject);
      return fs;
    },
    getClipStyle() {
      var style = new ol.style.Style({
          stroke: new ol.style.Stroke({
              color: 'rgba(255, 0, 0, 0)',
              width: 1
          }),
          fill: new ol.style.Fill({
              color: 'rgba(255, 0, 0, 0)'
          })
      })
      return style;
    },
    clipLayer(curlayer, features, style) {
      style = style ? style : this.getClipStyle()

      curlayer.on('precompose', (event)=> {
          var ctx = event.context;
          var vecCtx = event.vectorContext;
          ctx.save();
          var len = features.length;
          for (var i = 0; i < len; i++) {
              vecCtx.drawFeature(features[i], style);
          }
          ctx.clip();
      });
      curlayer.on('postcompose', function(event) {
          var ctx = event.context;
          ctx.restore();
      });
    },
    // extent 是否相交
    intersects(extent1, extent2) {
      var result = ol.extent.intersects(extent1, extent2)
      return result
    },
    // 定位到坐标
    animateToCoor(coordinates, zoomLevel=10, transform) {
      if (transform) {
        coordinates = ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857')
      }
      this.map.getView().animate({zoom: zoomLevel, center: coordinates, duration: 550, easing:  (t)=> Math.pow(t, 1.5)});
    },
    /* 
      @options: {
        serverUrl: 'http://xxx.com',
        layerName: 'layer name',
        extent: [1, 2, 3, 4],
        visible: true,
        opacity: 1,
        zIndex: 3,
        styles: 'sld name',
        sld: '<sld></sld>',
        env: 'c122:#ff0000;c128:#00ff00;c134:#0000ff;o134:1;o122:1;o128:1'
      }
     */
    getTileLayer(options) {

      if (!options.serverUrl) {
        console.error("Please set 'serverUrl'")
        return null
      }
      
      var layer = new ol.layer.Tile({
        visible: options.visible !== undefined ? options.visible : true,
        extent: options.extent,
        opacity: options.opacity !== undefined ? options.opacity : 1,
        source: new ol.source.TileWMS({
          url: options.serverUrl,
          params: {
            LAYERS: options.layerName,
            tiled: true,
            FORMAT: "image/png",
            VERSION: '1.1.1',
          }
        }),
        zIndex: options.zIndex !== undefined ? options.zIndex : this.DEFAUL_ZINDEX
      })

      this.updateParams(layer, "STYLES", options.styles)
      this.updateParams(layer, "ENV", options.env)
      this.updateParams(layer, "SLD_BODY", options.sld)

      return layer
    },
    updateParams(layer, key, value) {
      if (value) {
        layer.getSource().updateParams({[key]: value});
      }
    },
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