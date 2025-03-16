import vh from 'vh-plugin'
import { fmtDate } from '../utils/index'
import { $GET } from '../utils/index'
// 图片懒加载
import vhLzImgInit from "../scripts/vhLazyImg";
// 灯箱JS初始化======
import "../../public/assets/js/view-image.min.js";
declare const ViewImage: any;
// 灯箱JS初始化======

const TalkingInit = async (data: any) => {
  const talkingDOM = document.querySelector('.vh-container>.vh-talking>main')
  if (!talkingDOM) return;
  try {
    let res = data;
    if (typeof data === 'string') {
      const apiResponse = await $GET(data);
      // 处理符合ruoyi后端格式的API响应，提取data字段
      if (apiResponse && apiResponse.code === 200 && Array.isArray(apiResponse.data)) {
        res = apiResponse.data;
      } else {
        throw new Error('API返回格式异常');
      }
    }
    talkingDOM.innerHTML = res.map((i: any) => `<article><header><img data-vh-lz-src="https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640" /><p class="info"><span>.𝙃𝙖𝙣</span><time>${fmtDate(i.date)}前</time></p></header><section class="main">${i.content}</section><footer>${i.tags.map((tag: any) => `<span>${tag}</span>`).join('')}</footer></article>`).join('');
    // 图片懒加载
    vhLzImgInit();
    // 灯箱JS初始化======
    setTimeout(() => (ViewImage && ViewImage.init(".vh-talking>main>article>.main img, .vh-comment>.twikoo>.tk-comments img:not(.tk-avatar-img,.tk-owo-emotion,.OwO-item img)")));
    // 灯箱JS初始化======
  } catch (error) {
    console.error('获取动态数据失败:', error);
    vh.Toast('获取数据失败')
  }
}


// 动态说说初始化
import TALKING_DATA from "../page_data/Talking";
const { api, data } = TALKING_DATA;
export default () => TalkingInit(api || data);