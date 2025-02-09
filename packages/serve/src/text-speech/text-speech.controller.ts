import { Controller, Get, Param, Query } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const getTextData = () => {
  const serverPath = process.cwd();
  const filePath = resolve(serverPath, 'src/text-speech/data/text.txt');

  try {
    const data = readFileSync(filePath, 'utf8');
    const list = data
      .replace(/\r/g, '')
      .split('------------')
      .filter((e) => !!e);
    const res = list
      .filter((item) => item.length > 1)
      .map((item, index) => {
        const [name, ...rest] = item.split('\n').filter((e) => !!e);
        const [code, ...nameRest] = name.split(' ');
        return {
          name: nameRest.join(''),
          content: rest.join(''),
          index,
          code: +code || 0,
        };
      });
    return res;
  } catch (err) {
    // 若读取文件时发生错误，打印错误信息
    console.error('读取文件时出错:', err);
  }
};

const cacheData = getTextData();

@Controller('text-speech')
export class TextSpeechController {
  @Get()
  getData() {
    return '获取四合院小说';
  }
  @Get('list')
  getList(@Query() query) {
    const list = cacheData;
    const { page = 1, pageSize = 10 } = query;
    const start = (+page - 1) * +pageSize;
    const end = start + +pageSize;
    console.log('start', start);
    console.log('end', end);
    const data = list.slice(start, end).map((item) => {
      const { name, code, index } = item;
      return {
        name,
        code,
        index,
      };
    });
    const pageCount = Math.ceil(list.length / pageSize);
    // console.log('data', data);
    return { data, total: list.length, pageCount, pageSize, page };
  }
  @Get('chapter/:code')
  getDataByChapter(@Param() params) {
    const { code } = params;
    const list = getTextData();
    const res = list.find((item) => item.code === +code);
    return res;
  }
}
