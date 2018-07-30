package retail.common;

import java.net.URLEncoder;
import java.util.Arrays;
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
import org.apache.poi.ss.usermodel.Font;
import org.springframework.web.servlet.view.document.AbstractExcelView;

public class ExcelDownLoadFile extends AbstractExcelView {
	
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
		 
		
		List<String> colName = (List<String>) excelList.get("colName");
		Map<String,Object> colValue = (Map<String,Object>) excelList.get("colValue");

		HSSFSheet sheet = workbook.createSheet();
		HSSFCellStyle cs = workbook.createCellStyle();
		 
		cs.setFillForegroundColor(workbook.getCustomPalette().findSimilarColor((byte)0xda, (byte)0xda, (byte)0xda).getIndex());
		//cs.setFillForegroundColor(workbook.getCustomPalette().getColor(HSSFColor.GREEN.index).getIndex());
		cs.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		cs.setBorderTop(HSSFCellStyle.BORDER_THIN);
		
		workbook.setSheetName(0, (String) excelList.get("sheetName"));		
		
		creatColum(sheet, colName, cs);
		
		
		// 컬럼색을 지정할 컬럼 인덱스
		String[] colorArray = null;  
		if(excelList.get("colColor") != null && !excelList.get("colColor").equals("")){ 
			String colColor = excelList.get("colColor").toString().replace(" ", "") ; 
			colorArray =  colColor.split(","); 
		}
		
		// 컬럼 색 추가 시작
		HSSFCellStyle col = workbook.createCellStyle();
		HSSFFont fontRed = workbook.createFont();
		fontRed.setColor(Font.COLOR_RED); 
		col.setFont(fontRed);
		col.setFillForegroundColor(HSSFColor.YELLOW.index);  
		col.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		// 컬럼 색 추가 끝
		for ( int i = 0; i < colValue.size(); i++ ) {
			createRow(sheet, (List<String>)colValue.get("time"+i), i+1, col , colorArray);
		}
		
		for ( int i = 0; i < colName.size(); i++ ) sheet.autoSizeColumn(i);
	}

	private void creatColum(HSSFSheet sheet, List<String> coln, HSSFCellStyle cs) {

		HSSFRow header = sheet.createRow(0); 
		HSSFCell cell = null;
		  
		for (int i = 0; i < coln.size(); i++) {
			cell = header.createCell(i);
			cell.setCellValue(coln.get(i));
			cell.setCellStyle(cs);
			  
		}

	}

	// 각 로우에 대한 값 입력
	private void createRow(HSSFSheet sheet, List<String> colv, int rowNum  , HSSFCellStyle colColor ,  String[] colorArray) {

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
					
					if(colorArray != null)
					{
							String j = String.valueOf(i);  
							if ( Arrays.binarySearch(colorArray , j   ) >= 0 ) 
							{
								cell.setCellStyle(colColor); 
							}
					}
					 
					
					
					if(isStringDouble(colv.get(i))){
						if(colv.get(i).length() <= 11){
							//숫자형
							cell.setCellType(cell.CELL_TYPE_NUMERIC);
							cell.setCellValue(Double.parseDouble(colv.get(i)));
						}else{
							//문자형 (100억까지 표현가능) 이상은 문자열로 대체
							cell.setCellValue(colv.get(i));
						}
					}else{
						//문자형
						cell.setCellValue(colv.get(i));
					}
					
					//System.out.println(i +">>>>>>>>>>>"+ cell.getCellType());
					
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

	
	/**
	 * string/int구분
	 * @param s
	 * @return
	 */
	public static boolean isStringDouble(String s) {
	    try {
	        Double.parseDouble(s);
	        return true;
	    } catch (NumberFormatException e) {
	        return false;
	    }
	  }
	
}
