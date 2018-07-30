package retail.wms.stock.wmsStockDivision.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
*
* @Class Name : WmsStockDivisionDao.java
* @Description :
* @Modification Information
* @
* @  수정일          수정자                 수정내용
* @ ---------   ---------   -------------------------------
* @ 2017.05.10     최호정                 최초생성
*
* @author 최호정
* @since 2017.05.15
* @version 1.0
* @see Copyright (C) by Retailtech All right reserved.
*/
@Repository("WmsStockDivisionDao")
public class WmsStockDivisionDao extends EgovAbstractDAO {

    /**
     * 소분상품으로 등록하려는 상품 search (원물/소분)
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> searchWmsDivisionItem(Map<String, Object> params) throws Exception {
        select("wmsStockDivision.searchDivisionItem", params);
        return params;
    }

    /**
     * 기 등록된 소분상품 List
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> selectWmsDivisionList(Map<String, Object> params) throws Exception {
        select("wmsStockDivision.selectDivisionList", params);
        return params;
    }

    /**
     * 신규 소분상품 정보 insert
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> insertWmsDivisionItem(Map<String, Object> params) throws Exception {
        select("wmsStockDivision.insertDivisionItem", params);
        return params;
    }

    /**
     * 등록된 소분상품에 대해 확정일자가 null일 경우 부분 update
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> updateWmsDivisionItem(Map<String, Object> params) throws Exception {
        select("wmsStockDivision.updateDivisionItem", params);
        return params;
    }

    /**
     * 등록된 소분상품에 대해 확정일자만 update
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> confirmWmsDivisionItem(Map<String, Object> params) throws Exception {
        select("wmsStockDivision.confirmDivisionItem", params);
        return params;
    }
}
