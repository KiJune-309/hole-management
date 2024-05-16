<template>
  <div class="detail" ref="containerRef">
    <a-affix :target="(containerRef as HTMLElement)">
      <a-page-header title="详情" subtitle="Detail Page" class="head">
        <template #extra>
          <a-button>返回</a-button>
        </template>
      </a-page-header>
    </a-affix>

    <a-card title="基本信息" :bordered="false" class="item">
      <a-row justify="space-between">
        <a-col :xs="24" :sm="16" :md="16" :lg="18" :xl="18" :xxl="18">
          <a-descriptions
            table-layout="fixed"
            layout="inline-horizontal"
            :column="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }"
          >
            <a-descriptions-item label="姓名：">{{ clerkDetail.clerkName }}</a-descriptions-item>
            <a-descriptions-item label="性别：">{{clerkDetail.sex?"男":"女"}}</a-descriptions-item>
            <a-descriptions-item label="城市：">{{clerkDetail.position}}</a-descriptions-item>
            <a-descriptions-item label="手机号：">{{clerkDetail.phone}}</a-descriptions-item>
            <a-descriptions-item label="年龄：">{{clerkDetail.age}}岁</a-descriptions-item>
            <a-descriptions-item label="座右铭：">{{ clerkDetail.motto }}</a-descriptions-item>
            <a-descriptions-item label="加入时间：">{{clerkDetail.createTime}}</a-descriptions-item>
            <a-descriptions-item label="标签：">
              <a-space :size="5" wrap>
                <a-tag color="#f53f3f" v-for="label in clerkDetail.labels">{{label}}</a-tag>
              </a-space>
             </a-descriptions-item>
          </a-descriptions>
          <a-space :size="10" direction="vertical">
            <span>个人图片：</span>
            <a-carousel
                indicator-type="line"
                :style="{width: '600px',height: '240px',}"
                :auto-play="true"
                show-arrow="hover"
            >
              <a-carousel-item v-for="image in clerkDetail.carousels">
                <img :src="image" :style="{width: '100%',}"/>
              </a-carousel-item>
            </a-carousel>
          </a-space>
        </a-col>
        <a-col offset="20">
            <a-button status="normal" :loading="loading" shape="round" type="primary" size="large" @click="setStatus">{{operationStatus}}</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="tsx">
import {reactive} from 'vue';
import {getClerkDetailInfo, setClerkStatus} from "@/apis"
import {useRoute}  from "vue-router";
import { useLoading } from '@/hooks'
defineOptions({ name: 'SeniorDetail' })
const { loading, setLoading } = useLoading()
import { Message, type FormInstance } from '@arco-design/web-vue'

const containerRef = ref<HTMLElement | null>()
const routes =  useRoute();

// 接口返回的数据
const clerkDetail = reactive({
  clerkName: 'Lin',
  sex: 0,
  birthday: '07月16日',
  position: '广州市',
  phone: '155 **** 8810',
  motto: '这个人很懒，没有描述自己',
  age:20,
  labels:[],
  carousels: [],
  createTime:"",
  delete:true
});

const setStatus=async ()=>{
  try {
    setLoading(true);
    const res = await setClerkStatus({clerkId:routes.query.clerkId})
    if(res.data) clerkDetail.delete = !clerkDetail.delete;
    Message.success(res.message)
  }catch(error){

  }finally {
    setLoading(false);
  }
}

const operationStatus = computed(()=>clerkDetail.delete?"上价":"下价")

const getClerkDetail=async (clerkId)=>{
  try {
    loading.value = true;
    if(!clerkId) throw new Error("clerkId get fail")
    const res = await getClerkDetailInfo({clerkId});
    for (const resKey in res.data) {
      clerkDetail[resKey] = res.data[resKey];
    }
  }catch (e){
    console.log("获取信息失败");
  }finally {
    loading.value = false;
  }
}

getClerkDetail(routes.query.clerkId);
watch(
    () => routes.query.clerkId,
    async newId =>await getClerkDetail(newId)
)

</script>

<style lang="scss" scoped>
:deep(.arco-steps-item-process .arco-steps-icon) {
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail {
  overflow: auto;
  .head {
    background: var(--color-bg-1);
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  }
  .item {
    margin: $margin;
    background: var(--color-bg-1);
    border-radius: 2px;
  }
}
</style>
