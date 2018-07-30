package retail.stock.stockReal.web;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class XmlGene {
	 /**
	  * @param args
	  */
	 public static void main(String[] args) {
	  // TODO Auto-generated method stub
	  Document doc = new Document();  
	  
	  Element GRIDLIST = new Element("GRIDLIST");
	  
	 
	  
	  for(int i = 0; i < 10 ; i++){
		  Element GRIDROW = new Element("GRIDROW");
		  
		  Element CORP_CODE = new Element("CORP_CODE");
		  Element INV_DT = new Element("INV_DT");
		  Element STR_CODE = new Element("STR_CODE");
		  
		  GRIDLIST.addContent(GRIDROW);//root element 의 하위 element 를 만들기
		  
		  CORP_CODE.setText("U1");
		  INV_DT.setText("20170208");
		  STR_CODE.setText("10015");
		  
		  GRIDROW.addContent(CORP_CODE); //package element 의 하위로 package-name 만들기
		  GRIDROW.addContent(INV_DT); //package element 의 하위로 package-name 만들기
		  GRIDROW.addContent(STR_CODE); //package element 의 하위로 package-name 만들기
	  }
	  
	  
	  
	  
	  
	  //package-name element 에 value 값을 text 로 넣어 주기
	  
	  doc.setRootElement(GRIDLIST);
	  
	  //xml 파일을 떨구기 위한 경로와 파일 이름 지정해 주기
	  XMLOutputter serializer = new XMLOutputter();                 
	  Format f = serializer.getFormat();              
	  
	  //String 으로 xml 출력
	  XMLOutputter outputter = new XMLOutputter(Format.getPrettyFormat().setEncoding("UTF-8")) ;
	  System.out.println(outputter.outputString(doc));
	  
	  /*
	   * 만들어진 XML을 파일로 다운
	   * try {                                                             
	      FileOutputStream out = new FileOutputStream("d:\\test.xml"); 
	      //xml 파일을 떨구기 위한 경로와 파일 이름 지정해 주기
	      XMLOutputter serializer = new XMLOutputter();                 
	      Format f = serializer.getFormat();                            
	      f.setEncoding("UTF-8");
	      //encoding 타입을 UTF-8 로 설정
	      f.setIndent(" ");                                             
	      f.setLineSeparator("\r\n");                                   
	      f.setTextMode(Format.TextMode.TRIM);                          
	      serializer.setFormat(f);                                      
	      serializer.output(doc, out);          
	      out.flush();                                                  
	      out.close();    
	      
	      //String 으로 xml 출력
	      //XMLOutputter outputter = new XMLOutputter(Format.getPrettyFormat().setEncoding("UTF-8")) ;
	      //System.out.println(outputter.outputString(doc));
	  } catch (IOException e) {                                         
	      System.err.println(e);                                        
	  }*/     
	  
	  
	 }
}
