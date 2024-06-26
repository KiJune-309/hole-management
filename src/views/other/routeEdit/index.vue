<template>
  <div class="table-page">
    <div class="gi_table_box">
      <div class="top-operate">
        <a-button type="primary" @click="showModal">添加路由</a-button>
      </div>
      <a-table row-key="id" size="small" page-position="bottom" :bordered="{ cell: true }" :loading="loading"
        :data="tableData" :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :pagination="pagination">
        <template #columns>
          <a-table-column title="序号" :width="66" align="center">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="title" data-index="title" :width="120"></a-table-column>
          <a-table-column title="component" data-index="component" :width="200"></a-table-column>
          <a-table-column title="path" data-index="path" :width="200"></a-table-column>
          <a-table-column title="redirect" data-index="redirect" ellipsis tooltip></a-table-column>
          <a-table-column title="svgIcon" data-index="svgIcon" ellipsis tooltip></a-table-column>
          <a-table-column title="keepAlive" data-index="keepAlive" ellipsis tooltip></a-table-column>
          <a-table-column title="hidden" data-index="hidden" ellipsis tooltip></a-table-column>
          <a-table-column title="sort" data-index="sort" ellipsis tooltip></a-table-column>
          <a-table-column title="操作" fixed="right">
            <template #cell="{ record }">
              <a-button type="primary" @click="showModal">查看详细</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <addRouteModal :visible="visible" @setVisible="setVisible" :cansel="handleCancel" :confirm="handleOk">
      </addRouteModal>
    </div>
  </div>
</template>

<script setup>
import { usePagination } from '@/hooks'
import { getUserAsyncRoutes } from '@/apis'
import router from "@/router";
import { reactive } from 'vue';
import addRouteModal from './components/addRouteModal.vue'
import { setRoute } from '@/apis/system/index'

defineOptions({ name: 'TableBase' })
// 是否显示弹窗
const visible = ref(false);


// 弹窗取消
const handleCancel = () => {
  visible.value = false;
}

// 设置
const setVisible = (val) => {
  visible.value = val;
}

// 弹窗确定
const handleOk = async (form) => {
  // form转换成DataForm类型
  const fomrdata = new FormData();
  for (let item in form) {
    fomrdata.append(item, form[item])
  }
  setRoute(fomrdata);
}

const expandable = reactive({
  title: 'Expand',
  width: 80,
});
// 表格宽度
const col = { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 }

const loading = ref(false)
const tableData = ref([])


const { pagination, setTotal } = usePagination(() => getTableData())
const edit = (record) => {
  console.log("toDetail")
  router.push({
    path: "/detail/senior",
    query: {
      clerkId: record.clerkId
    }
  })
}

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getUserAsyncRoutes()
    tableData.value = res.data
    setTotal(res.data.total)
  } finally {
    loading.value = false
  }
}

const showModal = () => {
  visible.value = true;
}


getTableData()
</script>

<style lang="scss" scoped>
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.top-operate {
  display: flex;
  justify-content: end;
  margin: 10px 0;
}
</style>
