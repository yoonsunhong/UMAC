package retail.salesanal.report.service;

public class SalesAnalReportVO {

	private String 		INV_MT;                 	//년월
	private String 		STR_CODE;               	//점코드
	private String 		VEN_CODE;                	//거래선코드
	private String 		VEN_NAME;                	//거래선명
	private String 		LRG_CODE;                	//대분류

	private String 		LRG_NAME;                	//대분류명
	private String 		MID_CODE;                	//중분류
	private String 		MID_NAME;                	//중분류명
	private String 		CLS_CODE;                	//소분류
	private String 		CLS_NAME;                	//소분류명
	
	private String 		ITM_CODE;                	//상품코드
	private String 		SCAN_CODE;               	//스캔코드
	private String 		ITM_NAME;                	//상품명
	private int 		BASE_WPRC;              	//기초원가
	private int 		BASE_SPRC;              	//기초매가
	
	private int 		BASE_QTY;               	//기초수량
	private int 		PUR_WPRC;               	//매입원가
	private int 		NET_PUR_SPRC;           	//매입매가
	private int 		PUR_QTY;                	//매입수량
	private int 		DIN_WPRC;               	//대입원가
	
	private int 		NET_DIN_SPRC;           	//대입매가
	private int 		DIN_QTY;                	//대입수량
	private int 		RTN_WPRC;               	//반품원가
	private int 		NET_RTN_SPRC;           	//반품매가
	private int 		RTN_QTY;                	//반품수량
	
	private int 		DOUT_WPRC;              	//대출원가
	private int 		NET_DOUT_SPRC;          	//대출매가
	private int 		DOUT_QTY;               	//대출수량
	private int 		SALE_SPRC;              	//부가세 포함 매출금액
	private int 		NET_SALE_WPRC;          	//매출원가
	
	private int 		NET_SALE_SPRC;          	//매출매가
	private int 		SALE_QTY;               	//매출수량
	private int 		NEXT_BASE_WPRC;         	//차기이월재고원가
	private int 		NET_NEXT_BASE_SPRC;			//차기이월말매가
	private int 		PROFIT_RATE;            	//매익율
	
	private int 		PROFIT_AMT;             	//매출이익
	private int 		INV_QTY;                	//재고수량
	private int 		SIL_DEC_QTY;            	//실사확정수량
	private int 		NEXT_BASE_QTY;          	//차기이월수량
	
	

	
	public String getINV_MT() {
		return INV_MT;
	}
	public void setINV_MT(String iNV_MT) {
		INV_MT = iNV_MT;
	}
	public String getSTR_CODE() {
		return STR_CODE;
	}
	public void setSTR_CODE(String sTR_CODE) {
		STR_CODE = sTR_CODE;
	}
	public String getVEN_CODE() {
		return VEN_CODE;
	}
	public void setVEN_CODE(String vEN_CODE) {
		VEN_CODE = vEN_CODE;
	}
	public String getVEN_NAME() {
		return VEN_NAME;
	}
	public void setVEN_NAME(String vEN_NAME) {
		VEN_NAME = vEN_NAME;
	}
	public String getLRG_CODE() {
		return LRG_CODE;
	}
	public void setLRG_CODE(String lRG_CODE) {
		LRG_CODE = lRG_CODE;
	}
	public String getLRG_NAME() {
		return LRG_NAME;
	}
	public void setLRG_NAME(String lRG_NAME) {
		LRG_NAME = lRG_NAME;
	}
	public String getMID_CODE() {
		return MID_CODE;
	}
	public void setMID_CODE(String mID_CODE) {
		MID_CODE = mID_CODE;
	}
	public String getMID_NAME() {
		return MID_NAME;
	}
	public void setMID_NAME(String mID_NAME) {
		MID_NAME = mID_NAME;
	}
	public String getCLS_CODE() {
		return CLS_CODE;
	}
	public void setCLS_CODE(String cLS_CODE) {
		CLS_CODE = cLS_CODE;
	}
	public String getCLS_NAME() {
		return CLS_NAME;
	}
	public void setCLS_NAME(String cLS_NAME) {
		CLS_NAME = cLS_NAME;
	}
	public String getITM_CODE() {
		return ITM_CODE;
	}
	public void setITM_CODE(String iTM_CODE) {
		ITM_CODE = iTM_CODE;
	}
	public String getSCAN_CODE() {
		return SCAN_CODE;
	}
	public void setSCAN_CODE(String sCAN_CODE) {
		SCAN_CODE = sCAN_CODE;
	}
	public String getITM_NAME() {
		return ITM_NAME;
	}
	public void setITM_NAME(String iTM_NAME) {
		ITM_NAME = iTM_NAME;
	}
	public int getBASE_WPRC() {
		return BASE_WPRC;
	}
	public void setBASE_WPRC(int bASE_WPRC) {
		BASE_WPRC = bASE_WPRC;
	}
	public int getBASE_SPRC() {
		return BASE_SPRC;
	}
	public void setBASE_SPRC(int bASE_SPRC) {
		BASE_SPRC = bASE_SPRC;
	}
	public int getBASE_QTY() {
		return BASE_QTY;
	}
	public void setBASE_QTY(int bASE_QTY) {
		BASE_QTY = bASE_QTY;
	}
	public int getPUR_WPRC() {
		return PUR_WPRC;
	}
	public void setPUR_WPRC(int pUR_WPRC) {
		PUR_WPRC = pUR_WPRC;
	}
	public int getNET_PUR_SPRC() {
		return NET_PUR_SPRC;
	}
	public void setNET_PUR_SPRC(int nET_PUR_SPRC) {
		NET_PUR_SPRC = nET_PUR_SPRC;
	}
	public int getPUR_QTY() {
		return PUR_QTY;
	}
	public void setPUR_QTY(int pUR_QTY) {
		PUR_QTY = pUR_QTY;
	}
	public int getDIN_WPRC() {
		return DIN_WPRC;
	}
	public void setDIN_WPRC(int dIN_WPRC) {
		DIN_WPRC = dIN_WPRC;
	}
	public int getNET_DIN_SPRC() {
		return NET_DIN_SPRC;
	}
	public void setNET_DIN_SPRC(int nET_DIN_SPRC) {
		NET_DIN_SPRC = nET_DIN_SPRC;
	}
	public int getDIN_QTY() {
		return DIN_QTY;
	}
	public void setDIN_QTY(int dIN_QTY) {
		DIN_QTY = dIN_QTY;
	}
	public int getRTN_WPRC() {
		return RTN_WPRC;
	}
	public void setRTN_WPRC(int rTN_WPRC) {
		RTN_WPRC = rTN_WPRC;
	}
	public int getNET_RTN_SPRC() {
		return NET_RTN_SPRC;
	}
	public void setNET_RTN_SPRC(int nET_RTN_SPRC) {
		NET_RTN_SPRC = nET_RTN_SPRC;
	}
	public int getRTN_QTY() {
		return RTN_QTY;
	}
	public void setRTN_QTY(int rTN_QTY) {
		RTN_QTY = rTN_QTY;
	}
	public int getDOUT_WPRC() {
		return DOUT_WPRC;
	}
	public void setDOUT_WPRC(int dOUT_WPRC) {
		DOUT_WPRC = dOUT_WPRC;
	}
	public int getNET_DOUT_SPRC() {
		return NET_DOUT_SPRC;
	}
	public void setNET_DOUT_SPRC(int nET_DOUT_SPRC) {
		NET_DOUT_SPRC = nET_DOUT_SPRC;
	}
	public int getDOUT_QTY() {
		return DOUT_QTY;
	}
	public void setDOUT_QTY(int dOUT_QTY) {
		DOUT_QTY = dOUT_QTY;
	}
	public int getSALE_SPRC() {
		return SALE_SPRC;
	}
	public void setSALE_SPRC(int sALE_SPRC) {
		SALE_SPRC = sALE_SPRC;
	}
	public int getNET_SALE_WPRC() {
		return NET_SALE_WPRC;
	}
	public void setNET_SALE_WPRC(int nET_SALE_WPRC) {
		NET_SALE_WPRC = nET_SALE_WPRC;
	}
	public int getNET_SALE_SPRC() {
		return NET_SALE_SPRC;
	}
	public void setNET_SALE_SPRC(int nET_SALE_SPRC) {
		NET_SALE_SPRC = nET_SALE_SPRC;
	}
	public int getSALE_QTY() {
		return SALE_QTY;
	}
	public void setSALE_QTY(int sALE_QTY) {
		SALE_QTY = sALE_QTY;
	}
	public int getNEXT_BASE_WPRC() {
		return NEXT_BASE_WPRC;
	}
	public void setNEXT_BASE_WPRC(int nEXT_BASE_WPRC) {
		NEXT_BASE_WPRC = nEXT_BASE_WPRC;
	}
	public int getNET_NEXT_BASE_SPRC() {
		return NET_NEXT_BASE_SPRC;
	}
	public void setNET_NEXT_BASE_SPRC(int nET_NEXT_BASE_SPRC) {
		NET_NEXT_BASE_SPRC = nET_NEXT_BASE_SPRC;
	}
	public int getPROFIT_RATE() {
		return PROFIT_RATE;
	}
	public void setPROFIT_RATE(int pROFIT_RATE) {
		PROFIT_RATE = pROFIT_RATE;
	}
	public int getPROFIT_AMT() {
		return PROFIT_AMT;
	}
	public void setPROFIT_AMT(int pROFIT_AMT) {
		PROFIT_AMT = pROFIT_AMT;
	}
	public int getINV_QTY() {
		return INV_QTY;
	}
	public void setINV_QTY(int iNV_QTY) {
		INV_QTY = iNV_QTY;
	}
	public int getSIL_DEC_QTY() {
		return SIL_DEC_QTY;
	}
	public void setSIL_DEC_QTY(int sIL_DEC_QTY) {
		SIL_DEC_QTY = sIL_DEC_QTY;
	}
	public int getNEXT_BASE_QTY() {
		return NEXT_BASE_QTY;
	}
	public void setNEXT_BASE_QTY(int nEXT_BASE_QTY) {
		NEXT_BASE_QTY = nEXT_BASE_QTY;
	}
	
	
	
	
	
}//END CLASS