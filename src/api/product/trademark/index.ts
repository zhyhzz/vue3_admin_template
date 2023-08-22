//书写品牌管理模块接口
import request from "@/utils/request";

//品牌管理模块接口地址
enum API {
    //获取已有品牌接口
    TRADEMARK_URL="/admin/product/baseTrademark",
    //添加品牌
    ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
    //修改品牌
    UPDATETRAD_URL="/admin/product/baseTrademark/update",
    //删除已有品牌
    DELETE_URL="/admin/product/baseTrademark/remove/{id}"
}

//获取已有品牌的接口方法
//page:获取第几页--默认第一页
//limit： 获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) => 
    request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`);

export const reqAddorUpdateTrademark = (data: TradeMark) => {
    if(data.id) {
        request.put<any, any>(API.UPDATETRAD_URL, data)
    } else {
        request.post<any, any>(API.ADDTRADEMARK_URL, data);
    }
}

//删除某一个已有品牌的数据
export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + id);