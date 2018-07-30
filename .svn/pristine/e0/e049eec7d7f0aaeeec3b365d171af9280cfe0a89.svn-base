package retail.product.masterbasic.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.product.masterbasic.service.ProductMasterBasicService;
import retail.product.masterbasic.service.ProductMasterBasicVO;

@Service("ProductMasterBasicService")
public class ProductMasterBasicServiceImpl implements ProductMasterBasicService{
	
	@Autowired
	private ProductMasterBasicDao pmbDao;
	
	/* 기본상품마스터조회
	 * @see retail.product.masterbasic.service.ProductMasterBasicService#selectProductMasterBasic(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectProductMasterBasic(Map<String, Object> paramMap) throws Exception{
		pmbDao.selectProductMasterBasic(paramMap);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelProductMasterBasic(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		
		colName.add("점포코드");
		colName.add("점포명");
		colName.add("상품코드");
		//colName.add("REPT_YN");
		colName.add("대표여부");
		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("단축상품명");
		colName.add("협력업체코드");
		colName.add("협력업체명");
		colName.add("취급일자");
		colName.add("취급중단일자");
		colName.add("소분류코드");
		colName.add("소분류명");
		//colName.add("ITM_GB");
		colName.add("상품구분");
		//colName.add("TAX_GB");
		colName.add("과세구분");
		colName.add("규격");
		colName.add("입수량");
		colName.add("제품용량");
		colName.add("표시단위");
		colName.add("제조사명");
		//colName.add("ORG_CODE");
		colName.add("원산지");
		//colName.add("ROUTE_GB");
		colName.add("배송구분");
		colName.add("기준원가");
		colName.add("기준매가");
		colName.add("원가단가");
		colName.add("매가단가");
		colName.add("공병코드");
		colName.add("공병단가");
		//colName.add("GRE_GB");
		colName.add("거래구분");
		colName.add("수수료율");
		//colName.add("FTRACE_YN");
		colName.add("영유아식품이력");
		//colName.add("STRACE_YN");
		colName.add("수산물이력");
		//colName.add("MTRACE_YN");
		colName.add("축산물이력");
		//colName.add("INGR_YN");
		colName.add("공산식자재유무");
		//colName.add("MBR_DC_YN");
		colName.add("회원할인가능여부");
		//colName.add("POINT_SAVE");
		colName.add("포인트적립여부");
		//colName.add("GIFT_APP_YN");
		colName.add("사은품인정여부");
		//colName.add("WEIGHT_YN");
		colName.add("수중량관리여부");
		//colName.add("TPER_MTHD");
		colName.add("보관방법");
		//colName.add("VALID_DT_YN");
		colName.add("유효관리유무");
		colName.add("유효일수");
		colName.add("등록일자(공통)");
		colName.add("수정일자(공통)");
		colName.add("등록자(공통)");
		colName.add("수정자(공통)");
		colName.add("등록일자(점)");
		colName.add("수정일자(점)");
		colName.add("등록자(점)");
		colName.add("수정자(점)");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		pmbDao.excelProductMasterBasic(paramMap);
		
		List<ProductMasterBasicVO> RC = (List<ProductMasterBasicVO>) paramMap.get("CUR");
		
		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){
				
				colValue = new ArrayList<String>();
				
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_CODE")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("REPT_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("REPT_YN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_SHORT_NAME")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("END_DT")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("CLS_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CLS_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_GB_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("TAX_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("TAX_GB_NAME")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("UNIT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IPSU_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IN_CAPACITY")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("DP_PRC_UNIT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("MAKE_VEN_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORG_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORG_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ROUTE_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ROUTE_GB_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("BASE_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("BASE_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("BOT_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("BOT_SPRC")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("GRE_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("GRE_GB_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PRGT_RATE")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("FTRACE_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("FTRACE_YN")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STRACE_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STRACE_YN")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("MTRACE_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("MTRACE_YN")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("INGR_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("INGR_YN")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("MBR_DC_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("MBR_DC_YN")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("POINT_SAVE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("POINT_SAVE")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("GIFT_APP_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("GIFT_APP_YN")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("WEIGHT_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("WEIGHT_YN")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("TPER_MTHD")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("TPER_MTHD_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VALID_DT_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VALID_DT_YN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VALID_DD")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IDATE_CMN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("UDATE_CMN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NAME_CMN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("UEMP_NAME_CMN")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IDATE_STORE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("UDATE_STORE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NAME_STORE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("UEMP_NAME_STORE")));
				
				_map.put("time"+i, colValue);
				colValue = null;
				
			}
			
		}else{
			
			colValue = new ArrayList<String>();
			
			colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			
			_map.put("time"+0, colValue);
			
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	    Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		map.put("sheetName", "Sheet1");  				// 시트이름
		map.put("colName", colName);                 	// 제목값
		map.put("colValue", _map);			    		// 데이터
		map.put("excelname", "기본상품마스터조회엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}

}
