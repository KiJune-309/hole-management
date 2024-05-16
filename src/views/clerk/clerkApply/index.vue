<template>
  <div class="table-page">
    <GiForm :options="options" v-model="form" @search="search"></GiForm>

    <div class="gi_table_box">
      <a-table
          row-key="id"
          size="small"
          page-position="bottom"
          :bordered="{ cell: true }"
          :loading="loading"
          :data="tableData"
          :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
          :pagination="pagination"
      >
        <template #columns>
          <a-table-column title="序号" :width="66" align="center">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="姓名" data-index="clerkName" :width="120"></a-table-column>
          <a-table-column title="性别" #cell={record}>
            {{record.sex?"男":"女"}}
          </a-table-column>
          <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
          <a-table-column title="微信号" data-index="wxNumber" ellipsis tooltip></a-table-column>
          <a-table-column title="等级" data-index="level" ellipsis tooltip></a-table-column>
          <a-table-column title="状态" data-index="onlineStatus" ellipsis tooltip></a-table-column>
          <a-table-column title="创建时间" data-index="createTime" ellipsis tooltip></a-table-column>
          <a-table-column title="操作" fixed="right">
            <template #cell="{ record }">
              <a-button type="primary" @click="toDetail(record)">查看详细</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'
import {getClerkList} from '@/apis'
import type { Options } from '@/components/GiForm'
import router from "@/router";

defineOptions({ name: 'TableBase' })

const form = reactive({})

const col = { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 }
const options: Options = reactive({
  form: { layout: 'inline' },
  btns: { col: col },
  fold: { enable: true, index: 2 },
  columns: [
    {
      type: 'input',
      label: '姓名',
      field: 'name',
      col: col
    },
    {
      type: 'input',
      label: '手机',
      field: 'phone',
      col: col,
      props: {
        maxLength: 11
      }
    },
    {
      type: 'select',
      label: '等级',
      field: 'level',
      col: col,
      options: [
        { label: '小学生', value: 1 },
        { label: '初中生', value: 2 }
      ]
    },
    {
      type: 'input',
      label: '微信号',
      field: 'wxNumber',
      col: col
    }
  ]
})

const loading = ref(false)
const tableData = ref<PersonItem[]>([])

const { pagination, setTotal } = usePagination(() => getTableData())
const toDetail=(record)=>{
  console.log("toDetail")
  router.push({
    path:"/detail/senior",
    query:{
      clerkId:record.clerkId
    }
  })
}

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getClerkList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    tableData.value = res.data.records
    setTotal(res.data.total)
  } finally {
    loading.value = false
  }
}

getTableData()

const search = () => {
  pagination.current = 1
  getTableData()
}
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
</style>
