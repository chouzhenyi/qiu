<template>
  <div class="wrapper">
    <h1>语音合成</h1>
    <div>
      <Progress :percent="percentRef" />
      <div>已播放：{{ elapsedTimeRef }}秒</div>
      <Button type="primary" @click="handlePause">暂停</Button>
      <Button type="primary" @click="handleResume">播放</Button>
      <Button type="primary" @click="handleStop">停止</Button>
    </div>
    <Card>
      <div>{{ playDataRef.name }}</div>
      <div>第{{ playDataRef.code }}章</div>
      <div>第{{ playDataRef.currentPage }}页</div>
    </Card>
    <Table
      bordered
      size="small"
      :columns="columns"
      :data-source="chapterList"
      :pagination="{
        current: currentPage,
        pageSize: pageSizeRef,
        total: totalRef,
        showsizeChanger: true,
        showQuickJumper: true,
        pageCount: pageCountRef,
        showTotal: (total: number) => `共 ${total} 条`,
        onChange: handleTableChange,
      }"
    >
      <template #operation="{ record }">
        <Button type="primary" @click="play(record)">播放</Button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
export default {
  name: "Speech",
};
</script>
<script lang="ts" setup>
import { Table, Progress, Button, Card } from "ant-design-vue";
import { ChapterList, ChapterContent } from "../../api/speech"; // 导入接口
import { ref, onMounted } from "vue";
const columns = [
  {
    title: "章节ID",
    dataIndex: "code",
    key: "code",
    width: 150,
  },
  {
    title: "章节名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "operation",
    dataIndex: "operation",
    slots: { customRender: "operation" },
  },
];
const chapterList = ref([]);
const currentPage = ref(1);
const pageSizeRef = ref(10);
const totalRef = ref(0);
const pageCountRef = ref(0);
const handleTableChange = (page: number, pageSize: number = 10) => {
  currentPage.value = page;
  pageSizeRef.value = pageSize;
  ChapterList({
    page,
    pageSize,
  }).then((res) => {
    const { data, total, pageCount } = res;
    chapterList.value = data;
    totalRef.value = total;
    pageCountRef.value = pageCount;
  });
};
const percentRef = ref(0);
const elapsedTimeRef = ref(0);
const playName = "SiheyuanData";
const playDataRef = ref({
  name: "",
  code: "",
  currentPage: 1,
  content: "",
});
const initData = () => {
  const playDataStr = localStorage.getItem(playName);
  if (playDataStr) {
    const playData = JSON.parse(playDataStr);
    const { currentPage } = playData;
    playDataRef.value = playData;
    handleTableChange(currentPage || 1);
  } else {
    handleTableChange(1);
  }
  speechSynthesis.cancel();
};
const handlePlay = (content: string) => {
  const u = new SpeechSynthesisUtterance(content);
  u.lang = "zh-CN";
  u.volume = 1;
  u.rate = 1; // 语速
  u.pitch = 1; // 音调
  speechSynthesis.speak(u);
  //   u.onend = () => {
  //     console.log("播放结束");
  //   };
  //   u.onerror = (e) => {
  //     console.log("播放出错", e);
  //   };
  //   u.onpause = () => {
  //     console.log("暂停");
  //   };
  //   u.onresume = () => {
  //     console.log("恢复");
  //   };
  //   u.onstart = () => {
  //     console.log("开始");
  //   };
  u.onboundary = (e) => {
    const { charIndex, elapsedTime } = e;
    percentRef.value = (charIndex / content.length) * 100;
    elapsedTimeRef.value = Math.floor(elapsedTime / 1000);
  };
};
const handlePause = () => {
  speechSynthesis.pause();
};
const handleResume = () => {
  const { paused, pending, speaking } = speechSynthesis;
  if (paused) {
    speechSynthesis.resume();
    return;
  }
  if (speaking) {
    return;
  }

  const playDataStr = localStorage.getItem(playName);
  if (playDataStr) {
    const { content } = JSON.parse(playDataStr);
    content && handlePlay(content);
  }
};
const handleStop = () => {
  speechSynthesis.cancel();
};
const play = async (record: any) => {
  const { code } = record;
  const data = await ChapterContent({
    code,
  });
  const { name, content } = data;
  playDataRef.value = { name, code, currentPage: currentPage.value, content };
  localStorage.setItem(playName, JSON.stringify(playDataRef.value));
  handlePlay(content);
};
onMounted(async () => {
  initData();
});
</script>
<style lang="less" scoped>
.wrapper {
  padding: 20px;
}
</style>
