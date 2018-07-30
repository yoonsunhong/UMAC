package retail.common;

import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.Region;
import org.springframework.web.servlet.view.document.AbstractExcelView;

public class ExcelTwoTitleDownLoadFile extends AbstractExcelView {
	
	@SuppressWarnings("deprecation")
	@Override
	protected void buildExcelDocument(Map model, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map<String, Object> excelList = (Map<String, Object>) model.get("excelList");
		
		if(excelList.get("excelname") != null && !excelList.get("excelname").equals("")){
			
			String filename = excelList.get("excelname").toString();
			 
			response.setHeader("Content-Disposition", "attachment; filename="+new String((filename).getBytes("KSC5601"),"8859_1")+".xls");   
			response.setHeader("Content-Description", "JSP Generated Data");
			 
		}
		
		
		List<String> colTitle = (List<String>) excelList.get("colTitle");
		List<String> colName = (List<String>) excelList.get("colName");
		
		Map<String,Object> colValue = (Map<String,Object>) excelList.get("colValue");

		HSSFSheet sheet = workbook.createSheet();
		
		//제목 폰트
        HSSFFont hf = workbook.createFont();
        hf.setFontHeightInPoints((short) 10);
        hf.setColor((short) HSSFColor.BLACK.index);
        hf.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

        //제목 폰트 style setting
        HSSFCellStyle titleCs = workbook.createCellStyle();
        titleCs.setFont(hf);
        titleCs.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		
		
		//헤더 Style
		HSSFCellStyle cs = workbook.createCellStyle();
		
		
		cs.setFillForegroundColor(workbook.getCustomPalette().findSimilarColor((byte)0xda, (byte)0xda, (byte)0xda).getIndex());
		//cs.setFillForegroundColor(workbook.getCustomPalette().getColor(HSSFColor.GREEN.index).getIndex());
		cs.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		cs.setBorderTop(HSSFCellStyle.BORDER_THIN);
		
		workbook.setSheetName(0, (String) excelList.get("sheetName"));		
		
		//검색조건 셀 생성
		creatColumTitle(sheet, colTitle, titleCs);
		
		//테이블 헤더 셀 생성
		creatColum(sheet, colName, cs);
		
		for ( int i = 0; i < colValue.size(); i++ ) {
			createRow(sheet, (List<String>)colValue.get("time"+i), i+2);
		}
		
		for ( int i = 0; i < colName.size(); i++ ) sheet.autoSizeColumn(i);
		
		//셀병합 
		//Region(int 시작row, short 시작col, int 종료row, short 종료col) 
		sheet.addMergedRegion(new Region(0,(short)0,0,(short)6));
	}

	private void creatColumTitle(HSSFSheet sheet, List<String> coln, HSSFCellStyle cs) {

		HSSFRow header = sheet.createRow(0);

		HSSFCell cell = null;
		
		for (int i = 0; i < coln.size(); i++) {
			cell = header.createCell(i);
			cell.setCellValue(coln.get(i));
			cell.setCellStyle(cs);
		}

	}
	
	private void creatColum(HSSFSheet sheet, List<String> coln, HSSFCellStyle cs) {

		HSSFRow header = sheet.createRow(1);

		HSSFCell cell = null;
		
		for (int i = 0; i < coln.size(); i++) {
			cell = header.createCell(i);
			cell.setCellValue(coln.get(i));
			cell.setCellStyle(cs);
		}

	}

	// 각 로우에 대한 값 입력
	private void createRow(HSSFSheet sheet, List<String> colv, int rowNum) {

		HSSFRow row = sheet.createRow(rowNum);

		HSSFCell cell = null;
		
		if(row != null) {
			
			if(colv == null){
				cell = row.createCell(0);
				cell.setCellValue(colv.get(0) == null ? "" : colv.get(0));
			}
			else {
				for ( int i = 0 ; i < colv.size(); i++ ) {
					cell = row.createCell(i);
					cell.setCellValue(colv.get(i));
				}
			}
			
		}
	}
	
	/**
	 * 브라우저 구분 얻기.
	 * 
	 * @param request
	 * @return
	 */
	public static String getBrowser(HttpServletRequest request) {
		 String header = request.getHeader("User-Agent");
		 if(header.indexOf("MSIE") > -1) {
		  return "MSIE";
		 }
		 /*
		  * IE 10 버전 이하에서는 'MSIE' 문자열을 체크하여 브라우저가 IE인지 체크하였다.
		  * 하지만 IE 11 버전부터는 브라우저 정보에 MSIE라는 문자열이 들어가지 않는다
		  * 기존에 IE를 체크하던 로직은 IE 11을 나타내는 'rv:11' 문자열을 함께 체크하도록 해야 한다.
		  * */
		 else if(header.indexOf("rv:11.0") > -1){
		  return "ie11";
		 }
		 else if(header.indexOf("Chrome") > -1) {
		  return "Chrome";
		 }
		 else if(header.indexOf("Opera") > -1) {
		  return "Opera";
		 }
		 
		 return "Firefox";
		}
	
	
	public static String getDisposition(String filename, String browser) throws Exception{
		 String prefix = "attachment; filename=";
		 String encodedFilename = null;
		 
//		 System.out.println("filename1:"+filename);
//		 System.out.println("browser1:"+browser);
		 
		 if(browser.equals("MSIE")) {
		  encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		 } else if(browser.equals("ie11")) {
		  encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		 } else if(browser.equals("Firefox")) {
		  encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		 } else if(browser.equals("Opera")) {
		  encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		 } else if(browser.equals("Chrome")) {
			 
//			 System.out.println("filename:"+filename);
//			 System.out.println("browser:"+browser);
			 
			 StringBuffer sb = new StringBuffer();
				for (int i = 0; i < filename.length(); i++) {
					char c = filename.charAt(i);
					if (c > '~') {
						sb.append(URLEncoder.encode("" + c, "UTF-8"));
					} else {
						sb.append(c);
					}
				}
				encodedFilename = sb.toString();
		 }
		 else {
		  throw new RuntimeException("Not Supported Browser.");
		 }
		 
		 return prefix + encodedFilename;
		}
	
}
