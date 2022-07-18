import { omit, pick } from 'lodash-es'
import { StyleValue } from 'vue'

export interface CommonComponentProps {
  // actions
  actionType: string
  url: string
  // size
  height: number
  width: number
  paddingLeft: number
  paddingRight: number
  paddingTop: number
  paddingBottom: number
  // border type
  borderStyle: string
  borderColor: string
  borderWidth: number
  borderRadius: string
  // shadow and opacity
  boxShadow: string
  opacity: number
  // position and x,y
  left: number
  top: number
  transform: string
  // 文字相关
  fontSize: number
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textDecoration: string
  lineHeight: number
  textAlign: string
  color: string
  backgroundColor: string

  // 旋转
  rotate: number
}

// 基本组件类型参数
export const commonDefaultProps: Partial<CommonComponentProps> = {
  // actions
  actionType: '',
  url: '',
  // size
  height: 0,
  width: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: 0,
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: 1,
  // position and x,y
  left: 0,
  top: 0,
  transform: 'matrix(1, 0, 0, 1, 0, 0)',
  rotate: 0
}

// 文字组件类型参数
export interface TextComponentProps extends Partial<CommonComponentProps> {}

export const textDefaultProps: TextComponentProps = {
  ...commonDefaultProps,
  fontSize: 14,
  height: 20,
  lineHeight: 1.5,
  width: 200,
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  textAlign: 'center',
  color: '#000000',
  backgroundColor: ''
}

// 图片组件类型参数
export interface ImageComponentProps extends Partial<CommonComponentProps> {
  imageSrc: ''
}

export const imageDefaultProps: ImageComponentProps = {
  imageSrc: '',
  ...commonDefaultProps
}

// 所有组件类型
export type ComponentAllTypes =
  | Partial<CommonComponentProps>
  | ImageComponentProps
  | TextComponentProps

// 各组件默认的配置
type DefaultPropsType = {
  [key: string]: {
    props: ComponentAllTypes
    extraProps?: { [key: string]: any }
  }
}

export const componentsDefaultProps: DefaultPropsType = {
  'l-text': {
    props: {
      ...textDefaultProps
    }
  },
  'l-image': {
    props: {
      ...imageDefaultProps
    }
  },
  'l-shape': {
    props: {
      backgroundColor: '',
      ...commonDefaultProps
    }
  }
}

/**
 * 将对象属性转为字符串属性去赋值
 * @param props 源属性
 * @param includeGeometric 是否包含几何属性
 * @returns style字符串
 */
export const propsToStyleString = (
  props: ComponentAllTypes,
  includeGeometric: boolean = false
): StyleValue => {
  const geometric = ['width', 'height', 'transform']
  const notNumberProps = ['lineHeight', 'opacity', 'rotate']
  let obj = {}
  if (includeGeometric) {
    obj = pick(props, geometric)
  } else {
    obj = omit(props, geometric)
  }
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'number' && !notNumberProps.includes(key)) {
      obj[key] += 'px'
    }
  })
  return obj
}
