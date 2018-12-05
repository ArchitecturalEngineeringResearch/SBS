# SBS API 文档
> SBS采用restful架构 开发 ，    作为  小工宝的后端服务 。 

> ###  创建  帖子    
> **METHOD**:   
> POST   
> **URL**:   
> /wxapp/location   
> **HEADERS**:   
> Content-Type:application/json
> 
> | 参数名称 | 是否必填 | 参数类型 |  作用|
> | ------ | ------ | ------ | ------
> | title | 中等文本 | string || 
> | location | 短文本 | object ||
> | location.longitude | 短文本 | string ||
> | location.latitude | 短文本 | string ||
> | content | 短文本 | string ||


> ###   获取 帖子
> **METHOD**:   
> GET   
> **URL**:   
> /wxapp/location  
> QUERY
> 
> | 参数名称 | 是否必填 | 参数类型 |    作用  |
> | ------ | ------ | ------ | ------|
> | geo    |  否      | string | 获取此geo附近的帖子|


> ###   删除 帖子
> **METHOD**:   
> DELETE   
> **URL**:   
> /wxapp/location  
> QUERY
> 
> | 参数名称 | 是否必填 | 参数类型 |    作用  |
> | ------ | ------ | ------ | ------|
> | id     |  是      | string |删除ID指向的帖子|

> ### 修改帖子（局部）
> **METHOD**:   
> PATCH   
> **URL**:   
> /wxapp/location/ID 
> QUERY
> 
> | 参数名称 | 是否必填 | 参数类型 |    作用  |
> | ------  | ------ | ------ | ------|
> | title   |  否      | string ||

> ### 修改帖子（全部,如果有属性没有填就清空）
> **METHOD**:   
> PUT   
> **URL**:   
> /wxapp/location/ID 
> QUERY
> 
> | 参数名称 | 是否必填 | 参数类型 |    作用  |
> | ------   | ------ | ------ | ------|
> | title   |  是      | string ||
