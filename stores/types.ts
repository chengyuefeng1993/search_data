type Stage = {
  auditSkipCount?: string
  auditWaitForMarkCount?: string
  dataSourceId?: string
  finishedCount?: string
  markingCount?: string,
  markingHandlingCount?: string
  markingSkipCount?: string
  totalCount?: string
  unAuditCount?: string
  waitForMarkCount?: string
}
type Tag = {
  clearCount?: string
  firstAuditCorrectCount?: string
  firstAuditCorrectRatio?: string
  firstAuditTotalCount?: string
  statisticMarkedCount?: string
  statisticTime?: string
  totalMarkedCount?: string
  userName?: string
}
type Skip = {
  count?: string
  userName?: string
}

type Review = {
  allowNineRectGrid: boolean
  allowUserInputText: number
  data: Array<DataType>
  dataAccessWay?: string
  dataType: string
  fullscreenShortKey: string
  isSingleSelection: boolean
  pageNo: number
  pageSize: number
  selectionType: number
  singleDataCount: number
  totalSize: number
}
type DataType = {
  answers: Array<Answers>
  caption: string
  dataId: number
  defaultCategory: string
  isAtlas: boolean
  itemVoList: Array<any>
  mediaEntityGroupList: Array<any>
  name: string
  reviewHistoryList: Array<string>
  reviewUser: string
}

type Answers = {
  allowUserInputText: number
  answerGroup: string
  answerName: string
  filedShowMap: object
  hasDefaultOption: number
  historyList: Array<string>
  historyVoList: Array<string>
  isSingleSelection: string
  itemShowType: string
  items: Array<object>
  resultLevelType: string
  reviewDisplay: Array<string>
  selectedItemIds: Array<string>
}

type Filter = {
  label?:string
  value?:string
}

export type {Stage,Tag,Skip,Review,Filter}
