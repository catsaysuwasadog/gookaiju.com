import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * 定义导航站点数据模型Schema对象
 */
const NavigationSchema = new Schema({
  name: { type: String, required: true, max: 100, },
  brief_info: { type: String, required: false, },
  url: { type: String, required: true, trim: true, },
  navlogo_url: { type: String, required: true, trim: true, },
  created_date: { type: Date, required: true, },
  navi_type: { type: Schema.Types.ObjectId, ref: 'NavigationType', required: true, },
});

/**
 * 定义导航数据模型的操作对象
 */
class NavigationClass {
  static publicFields() {
    return [ 'name', 'brief_info', 'navlogo_url', 'created_date', ];
  }
}

NavigationSchema.loadClass(NavigationClass);
const Navigation = mongoose.model('Navigation', NavigationSchema);

export default Navigation;
