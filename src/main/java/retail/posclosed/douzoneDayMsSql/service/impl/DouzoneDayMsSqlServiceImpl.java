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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.posclosed.douzoneDayMsSql.service.DouzoneDayMsSqlVO;

import com.ibatis.sqlmap.client.SqlMapClient;

import retail.posclosed.douzoneDayMsSql.service.DouzoneDayMsSqlService;

/**
 * 
 * @Class Name : DouzoneDayMsSqlServiceImpl.java
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
@Service("DouzoneDayMsSqlService")
public class DouzoneDayMsSqlServiceImpl implements DouzoneDayMsSqlService {        
	

	
	
	@Autowired
	private DouzoneDayMsSqlDao douzoneDayMsSqlDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DouzoneDayMsSqlServiceImpl.class);
	
 
	@Override
	public  Integer insertAccountMsSql(  DouzoneDayMsSqlVO params ) throws Exception {
		return douzoneDayMsSqlDao.insertAccountMsSql(params);
		  
	}
	
	@Override
	public  Integer insertAccountMsSqlPurch(  DouzoneDayMsSqlVO params ) throws Exception {
		return douzoneDayMsSqlDao.insertAccountMsSqlPurch(params);
		  
	}
	
	
	
	
	
	
	 
	
}
