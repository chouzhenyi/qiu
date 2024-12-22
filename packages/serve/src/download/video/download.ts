import axios from 'axios';

export const downloadFile = async (url, filename) => {
  const { data } = await axios.get(url);
  const list = data.split(/\n/).filter((str) => {
    return !/^#/.test(str) && !!str;
  });
  if (list.length) {
    console.log('需要下载的文件个数：', list.length);
    // list.length = 1;
  }
  console.log(list[0], filename);
};
