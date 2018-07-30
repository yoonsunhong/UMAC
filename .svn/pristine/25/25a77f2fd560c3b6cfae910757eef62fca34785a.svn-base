package retail.wms.stock.wmsStockDivision.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.wms.stock.wmsStockDivision.service.WmsStockDivisionService;

/**
 * 
 * @Class Name : WmsStockDivisionServiceImpl.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일                 수정자                   수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.05.10     최호정                  최초생성
 *
 * @author 최호정
 * @since 2017.05.15
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("WmsStockDivisionServiceImpl")
public class WmsStockDivisionServiceImpl implements WmsStockDivisionService {

    @Autowired
    private WmsStockDivisionDao wmsStockDivisionDao;

    /**
     * 소분상품으로 관리하려는 상품 검색
     */
    @Override
    public Map<String, Object> searchWmsStockDivisionItem(Map<String, Object> params) throws Exception {
        return wmsStockDivisionDao.searchWmsDivisionItem(params);
    }

    /**
     * 기 등록된 소분상품 List
     */
    @Override
    public Map<String, Object> selectWmsStockDivisionList(Map<String, Object> params) throws Exception {
        return wmsStockDivisionDao.selectWmsDivisionList(params);
    }

    /**
     * 새로운 소분상품 insert
     */
    @Override
    public Map<String, Object> insertWmsStockDivisionItem(Map<String, Object> params) throws Exception {
        return wmsStockDivisionDao.insertWmsDivisionItem(params);
    }

    /**
     * 기존 소분상품 정보 update
     */
    @Override
    public Map<String, Object> updateWmsStockDivisionItem(Map<String, Object> params) throws Exception {
        return wmsStockDivisionDao.updateWmsDivisionItem(params);
    }

    /**
     * 기존 소분상품 정보 cfm_dt update
     */
    @Override
    public Map<String, Object> confirmWmsStockDivisionItem(Map<String, Object> params) throws Exception {
        return wmsStockDivisionDao.confirmWmsDivisionItem(params);
    }

}
