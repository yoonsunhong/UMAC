package retail.product.reservation.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("ChangeReservationPriceDao")
public class ChangeReservationPriceDao extends EgovAbstractDAO {

	public void selectChangeReservationPrice(Map<String, Object> paramMap) throws Exception{
		list("changeReservationPrice.selectChangeReservationPrice", paramMap);
	}
	
	public void registChangeReservationPrice(Map<String, Object> paramMap) throws Exception{
		list("changeReservationPrice.registChangeReservationPrice", paramMap);
	}
	
	public  List<Map<String, Object>>  changeReserExcel( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("changeReservationPrice.changeReserExcel", param);
	}
	
/*	public Map<String, Object> changeReserExcel_map(Map<String, Object> params) throws Exception {
		select("changeReservationPrice.changeReserExcel_map", params);
		return params;
	}*/
	
	public void changeReserExcel_map(Map<String, Object> result)  throws Exception{
		insert("changeReservationPrice.changeReserExcel_map", result);	
	}
}
