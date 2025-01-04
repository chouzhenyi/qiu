import React, { Fragment } from "react"
import style from './style.module.less'

export const RenderUserInfo = () => { 
    return (
        <Fragment>
            <div className={style.cardWrapper}>
            <div className={ style.title}>用户信息</div>
            <div className={ style.content}>展示用户信息详情</div>
            </div>
        </Fragment>
    )
}