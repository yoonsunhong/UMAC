package retail.posclosed.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.posclosed.report.service.CreditDpotDtlStateService;

@Service("CreditDpotDtlStateService")
public class CreditDpotDtlStateServiceImpl implements CreditDpotDtlStateService{

	@Autowired
	private CreditDpotDtlStateDao creditDpotDtlStateDao; 
	
	@Override
	public List<Map<String, Object>> creditDpotDtlSelect(Map<String, Object> param) throws Exception {
		return creditDpotDtlStateDao.creditDpotDtlSelect(param);
	}
	@Override
	public List<Map<String, Object>> getDpotFlag(Map<String, Object> param) throws Exception {
		return creditDpotDtlStateDao.getDpotFlag(param);
	}
}
