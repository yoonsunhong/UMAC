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
package retail.code.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.code.service.CodeService;
import retail.code.service.CodeVO; 


/**
 * @Class Name : CodeServiceImpl.java
 * @Description : CodeService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.05           최초생성
 *
 * @author 문희훈
 * @since 2016. 12.05
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service("CodeService")
public class CodeServiceImpl  implements CodeService {

	@Autowired
	private CodeDao codeDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CodeServiceImpl.class);

	
	
	/* 공통코드 리스트 조회
	 * @see retail.code.service.CodeService#getCodeCategory(java.util.Map)
	 */
	@Override
	@Transactional
	public void getCodeCategory(Map<String, Object> paramMap) throws Exception { 
		codeDao.getCodeCategory(paramMap);
	}
	
	/* 공통코드 상세 조회
	 * @see retail.code.service.CodeService#getCodeDetail(java.util.Map)
	 */
	@Override
	@Transactional
	public void getCodeDetail(Map<String, Object> paramMap) throws Exception { 
		codeDao.getCodeDetail(paramMap);
	}
	
	/* 코드 중복 검사
	 * @see retail.code.service.CodeService#selectCountCode(java.util.Map)
	 */
	@Override
	@Transactional
	public  void selectCountCode(Map<String, Object> paramMap) throws Exception { 
		codeDao.selectCountCode(paramMap);
	}
	
	/* 공통코드 신규등록
	 * @see retail.code.service.CodeService#insertCategory(java.util.Map)
	 */
	@Override
	@Transactional
	public void insertCategory(Map<String, Object> paramMap) throws Exception { 
		codeDao.insertCategory(paramMap);
	}
	
	/* 공통코드 수정
	 * @see retail.code.service.CodeService#updateCategory(java.util.Map)
	 */
	@Override
	@Transactional
	public void updateCategory(Map<String, Object> paramMap) throws Exception { 
		codeDao.updateCategory(paramMap);
	}
	
	/* 공통코드 삭제
	 * @see retail.code.service.CodeService#deleteCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteCode(Map<String, Object> paramMap) throws Exception { 
		codeDao.deleteCode(paramMap);
	}
	
	/* 공통코드 상세 등록 
	 * @see retail.code.service.CodeService#insertCodeDetail(java.util.Map)
	 */
	@Override
	@Transactional
	public void insertCodeDetail(Map<String, Object> paramMap) throws Exception { 
		codeDao.insertCodeDetail(paramMap);
	}
	
	/* 공통코드 상세 수정
	 * @see retail.code.service.CodeService#updateCodeDetail(java.util.Map)
	 */
	@Override
	@Transactional
	public void updateCodeDetail(Map<String, Object> paramMap) throws Exception { 
		codeDao.updateCodeDetail(paramMap);
	}
	
	/* 공통코드 상세 삭제
	 * @see retail.code.service.CodeService#deleteCodeDetail(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteCodeDetail(Map<String, Object> paramMap) throws Exception { 
		codeDao.deleteCodeDetail(paramMap);
	}
	
	
	
	
	
	 
	
 
}
