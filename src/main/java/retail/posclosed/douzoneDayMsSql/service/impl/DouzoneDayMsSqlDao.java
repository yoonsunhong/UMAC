/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package retail.posclosed.douzoneDayMsSql.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

import retail.posclosed.douzoneDayMsSql.service.DouzoneDayMsSqlVO;

import retail.posclosed.douzoneDayMsSql.service.MsSqlEgovAbstractDAO; 
import com.ibatis.sqlmap.client.SqlMapClient;
import com.ibatis.sqlmap.client.SqlMapClientBuilder;

/**
 * 
 * @Class Name : DouzoneDayMsSqlDao.java
 * @Description : 영업정보 > POS정산 > POS마감정산
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 04.20           최초생성
 *
 * @author 김경진
 * @since 2017. 04. 20.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("DouzoneDayMsSqlDao")
public class DouzoneDayMsSqlDao extends    MsSqlEgovAbstractDAO {
	
//	private   SqlMapClient  sqlMap;
 
//	@SuppressWarnings("deprecation")
//	@Resource(name = "MsSqlMapClient")
//	public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
//        super.setSqlMapClient(sqlMapClient);
//    }
 
	public Integer insertAccountMsSql( DouzoneDayMsSqlVO  params ) throws Exception {
		 
		return (Integer) this.update("posClosedDouzoneDayToAccountServerMsSql.insertAccountMsSql", params);
	 
	} 
	
	public Integer insertAccountMsSqlPurch( DouzoneDayMsSqlVO  params ) throws Exception {
		 
		return (Integer) this.update("posClosedDouzoneDayToAccountServerMsSql.insertAccountMsSqlPurch", params);
	 
	} 
  
	
}
