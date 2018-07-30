package retail.common;

import java.io.File;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * 
 * @Class Name : BusinessNoticeController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01. 03           최초생성
 *
 * @author 김창열
 * @since 2017. 01. 03.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Component("fileUtils")
public class FileUtils {
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
    // 글로벌 파일 경로    
    @Value("#{props['Globals.FileUrl']}")
    private String globalsFileUrl;     

    public Map<String,Object> parseInsertFileInfo(Map<String,Object> param, MultipartHttpServletRequest req) throws Exception{
        MultipartFile multipartFile = null;
        String originalFileName = null;
        String originalFileExtension = null;
        String storedFileName = null;      
        Map<String, Object> param2 = null;

        File file = new File(globalsFileUrl);
        if(file.exists() == false){
            file.mkdirs();
        }         		
        
        multipartFile = req.getFile("D_UPFILE");
        if(!"".equals(multipartFile.getOriginalFilename())){
        	originalFileName = multipartFile.getOriginalFilename();
            originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            storedFileName = UUID.randomUUID().toString().replaceAll("-", "") + originalFileExtension;   
            file = new File(globalsFileUrl + storedFileName);
            multipartFile.transferTo(file);
            
            log.debug("------------- file start -------------");
            log.debug("filename : "+originalFileName);
            log.debug("filename2 : "+storedFileName);
            log.debug("size : "+multipartFile.getSize());
            log.debug("-------------- file end --------------\n");
            
            param.put("D_FILE_NAME", originalFileName);
            param.put("D_FILE_NAME1", storedFileName);
            param.put("D_FILE_SIZE", (int)multipartFile.getSize());
            
            log.debug(param.toString());
        }
        return param;
    }    
    
    /*public List<Map<String,Object>> parseInsertFileInfo(Map<String,Object> map, MultipartHttpServletRequest req) throws Exception{
        //MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
        Iterator<String> iterator = req.getFileNames();			        

        MultipartFile multipartFile = null;
        String originalFileName = null;
        String originalFileExtension = null;
        String storedFileName = null;         

        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        Map<String, Object> listMap = null;          

        String boardIdx = (String)map.get("IDX");         

        File file = new File(filePath);
        if(file.exists() == false){
            file.mkdirs();
        }         		

        while(iterator.hasNext()){
            multipartFile = req.getFile(iterator.next());
            if(multipartFile.isEmpty() == false){
                originalFileName = multipartFile.getOriginalFilename();
                originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                //storedFileName = CommonUtils.getRandomString() + originalFileExtension;
                storedFileName = UUID.randomUUID().toString().replaceAll("-", "") + originalFileExtension;                 

                file = new File(filePath + storedFileName);
                multipartFile.transferTo(file);
                
	            log.debug("------------- file start -------------");
	            log.debug("idx : "+boardIdx);
	            log.debug("filename : "+originalFileName);
	            log.debug("randomname : "+storedFileName);
	            log.debug("size : "+multipartFile.getSize());
	            log.debug("-------------- file end --------------\n");

                listMap = new HashMap<String,Object>();
                listMap.put("BOARD_IDX", boardIdx);
                listMap.put("FILE_NAME", originalFileName);
                listMap.put("FILE_NAME1", storedFileName);
                listMap.put("FILE_SIZE", multipartFile.getSize());
                list.add(listMap);
            }
        }
        return list;
    }*/

}
