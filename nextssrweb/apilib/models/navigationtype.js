import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * 定义导航站点类型数据模型Schema对象
 */
const NavigationTypeSchema = new Schema({
  name: { type: String, unique: true, required: true, max: 100, },
});

class NavigationTypeClass {
  static publicFields() {
    return [ 'name', ];
  }
}

NavigationTypeSchema.loadClass(NavigationTypeClass);
const NavigationType = mongoose.model('NavigationType', NavigationTypeSchema);

export default NavigationType;
