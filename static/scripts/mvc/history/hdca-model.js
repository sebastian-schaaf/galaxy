define(["mvc/collection/collection-model","mvc/history/history-content-model","utils/localization"],function(a,b){var c=b.HistoryContentMixin,d=a.ListDatasetCollection,e=a.PairDatasetCollection,f=a.ListPairedDatasetCollection,g=d.extend(c).extend({defaults:_.extend(_.clone(d.prototype.defaults),{model_class:"HistoryDatasetCollectionAssociation"}),initialize:function(a,b){d.prototype.initialize.call(this,a,b),c.initialize.call(this,a,b)},toString:function(){return["HistoryListDatasetCollection(",this.get("name"),")"].join("")}}),h=e.extend(c).extend({defaults:_.extend(_.clone(e.prototype.defaults),{model_class:"HistoryDatasetCollectionAssociation"}),initialize:function(a,b){e.prototype.initialize.call(this,a,b),c.initialize.call(this,a,b)},toString:function(){return["HistoryPairDatasetCollection(",this.get("name"),")"].join("")}}),i=f.extend(c).extend({defaults:_.extend(_.clone(f.prototype.defaults),{model_class:"HistoryDatasetCollectionAssociation"}),initialize:function(a,b){f.prototype.initialize.call(this,a,b),c.initialize.call(this,a,b)},toString:function(){return["HistoryListPairedDatasetCollection(",this.get("name"),")"].join("")}});return{HistoryListDatasetCollection:g,HistoryPairDatasetCollection:h,HistoryListPairedDatasetCollection:i}});
//# sourceMappingURL=../../../maps/mvc/history/hdca-model.js.map