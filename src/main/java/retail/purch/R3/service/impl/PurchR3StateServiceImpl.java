package retail.purch.R3.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.purch.R3.service.PurchR3StateService;
import retail.purch.R3.service.impl.PurchR3StateDao;

@Service("PurchR3StateServiceImpl")
public class PurchR3StateServiceImpl implements PurchR3StateService {

    @Autowired
    private PurchR3StateDao purchR3StateDao;

    @Override
    public List<Map<String, Object>> purchR3StateList(Map<String, Object> param) throws Exception {
        return purchR3StateDao.selectPurchR3StateList(param);
    }

}
