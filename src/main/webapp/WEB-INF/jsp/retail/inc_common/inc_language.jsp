<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%--
    파일명: inc_language.jsp
    설명:  공통으로 include 할 language 용 tag 맵핑
    author  : 문희훈
    since   : 2016.11.23
    version : 1.0
    guide : 
    1. JSP와 JS를 분리하여 개발을 하기 때문에, 프로퍼티 언어별 메세지 셋팅을 자바스크립트 전역변수에 담아 사용 
    2. JS에서 사용되는 alert, 멘트, innerHtml, grid등에 한글이 사용되는 곳은 전역변수에 담아 사용
    3. JSP에서 멘트 및 한글을 사용할경우에는 <spring:message code="프로퍼티변수"/> 해당 코드 바로 사용 가능
    4. 공통 메세지 또는 언어가 추가 되었을 시 다른 개발자에게 공유 및 배포 SVN 처리
--%>
<!-- 다국어를 위한 전역변수 js에서 alert, 한글태그 등에 사용-->
<script type="text/javascript" charset="utf-8">

/**공통 알림 메세지**/
var msgSaveConfirm = '<spring:message code="msgSaveConfirm"/>'; //저장하시겠습니까?
var msgSave= '<spring:message code="msgSave"/>'; //저장되었습니다.
var msgModifyConfirm= '<spring:message code="msgModifyConfirm"/>'; //수정 하시겠습니까?
var msgModify= '<spring:message code="msgModify"/>'; //수정되었습니다.
var msgDeleteConfirm= '<spring:message code="msgDeleteConfirm"/>'; //삭제 하시겠습니까?
var msgDelete= '<spring:message code="msgDelete"/>'; //삭제되었습니다.
var msgAuthDel= '<spring:message code="msgAuthDel"/>'; //권한을 삭제 하시겠습니까?
var msgAutUser= '<spring:message code="msgAutUser"/>'; //명의 사용자가 권한을 사용하고있습니다.
var msgConfirm = '<spring:message code="msgConfirm"/>'; //키 값이 중복됩니다. 확인 후 다시 시도 해주세요.
var msgConfirmFalse = '<spring:message code="msgConfirmFalse"/>'; //키 값이 중복됩니다. 확인 후 다시 시도 해주세요.
var pleaseCheck = '<spring:message code="pleaseCheck"/>'; //확인하세요.

/**공통 버튼**/
var btnNew='<spring:message code="btnNew"/>'; //신규
var btnSave='<spring:message code="btnSave"/>'; //저장
var btnDel='<spring:message code="btnDel"/>'; //삭제
var btnSearch='<spring:message code="btnSearch"/>'; //조회
var btnSubmit ='<spring:message code="btnSubmit"/>'; //확정
var btnCreate ='<spring:message code="btnCreate"/>'; //생성
var btnPrint ='<spring:message code="btnPrint"/>'; //인쇄
var btnExcel='<spring:message code="btnExcel"/>'; //엑셀
var btnExcelDown='<spring:message code="btnExcelDown"/>'; //엑셀다운
var btnExcelUpload='<spring:message code="btnExcelUpload"/>'; //엑셀업로드
var btnHelp='<spring:message code="btnHelp"/>'; //도움말
var btnHelpClose='<spring:message code="btnHelpClose"/>'; //도움말 닫기
var btnCancle='<spring:message code="btnCancle"/>'; //취소
var btnClose='<spring:message code="btnClose"/>'; //닫기
var btnSearchDate='<spring:message code="btnSearchDate"/>'; //조회일자
var btnPreview='<spring:message code="btnPreview"/>'; //미리보기
var regist='<spring:message code="regist"/>'; //등록
var updt='<spring:message code="updt"/>'; //수정
var btnExec='<spring:message code="btnExec"/>'; //실행


/**그리드 TEXT**/
var authGroupList='<spring:message code="authGroupList"/>'; //권한그룹 목록
var authGroupName='<spring:message code="authGroupName"/>'; //권한그룹 명 
var useYn='<spring:message code="useYn"/>'; //사용여부
var delYn='<spring:message code="delYn"/>'; //사용여부
var useMenus='<spring:message code="useMenus"/>'; //사용가능 메뉴
var explanation='<spring:message code="explanation"/>'; //설명
var disabledMenu='<spring:message code="disabledMenu"/>'; //사용불가 메뉴
var commonCode='<spring:message code="commonCode"/>'; //공통 코드
var remarks='<spring:message code="remarks"/>'; //비고
var shortName='<spring:message code="shortName"/>'; //단축명
var properties='<spring:message code="properties"/>'; //등록정보
var aboutFixes='<spring:message code="aboutFixes"/>'; //수정정보
var all ='<spring:message code="all"/>'; //전체
var select ='<spring:message code="select"/>'; //선택
var unused ='<spring:message code="unused"/>'; //미사용
var use ='<spring:message code="use"/>'; //사용
var txtDelete = '<spring:message code="txtDelete"/>'; //삭제
var txtNonDelete = '<spring:message code="txtNonDelete"/>'; //미삭제
var requiredFields ='<spring:message code="requiredFields"/>'; //필수입력항목
var commonCodeManagement ='<spring:message code="commonCodeManagement"/>'; //공통코드 관리
var buttonPermissions ='<spring:message code="buttonPermissions"/>'; //버튼권한
var defaultHelpMessage='<spring:message code="defaultHelpMessage"/>'; //작성된 도움말이 없습니다. 
var commonCodeManagement='<spring:message code="commonCodeManagement"/>'; //공통코드관리
var commonCode='<spring:message code="commonCode"/>'; //공통코드
var commonCodeName='<spring:message code="commonCodeName"/>'; //공통코드명
var commonCodeDetail='<spring:message code="commonCodeDetail"/>'; //공통코드 상세
var commonCodeDetailInsert='<spring:message code="commonCodeDetailInsert"/>'; //공통코드 상세 등록
var detailCodeId='<spring:message code="detailCodeId"/>'; //상세코드 아이디
var detailCodeName='<spring:message code="detailCodeName"/>'; //상세코드 명
var detailCodeShortName='<spring:message code="detailCodeShortName"/>'; //상세코드  단축명
var detailCodeExplanation='<spring:message code="detailCodeExplanation"/>'; //코드설명
var order='<spring:message code="order"/>'; //순서
var managementTopics='<spring:message code="managementTopics"/>'; //관리항목
var managementExplanation='<spring:message code="managementExplanation"/>'; //관리항목 설명
var store='<spring:message code="store"/>'; //점포
var pos='<spring:message code="pos"/>'; //POS
var posNumber='<spring:message code="posNumber"/>'; //Pos번호
var posName='<spring:message code="posName"/>'; //Pos명
var phoneNumber='<spring:message code="phoneNumber"/>'; //전화번호
var guideNumber='<spring:message code="guideNumber"/>'; //안내문번호
var guideMessage='<spring:message code="guideMessage"/>'; //안내메세지
var inputDate='<spring:message code="inputDate"/>'; //입력일
var modifier='<spring:message code="modifier"/>'; //수정자
var modifiedDate='<spring:message code="modifiedDate"/>'; //수정일
var majorCategory='<spring:message code="majorCategory"/>'; //대분류
var middleCategory='<spring:message code="middleCategory"/>'; //중분류
var subCategory='<spring:message code="subCategory"/>'; //소분류
var majorCategoryName='<spring:message code="majorCategoryName"/>'; //대분류명
var middleCategoryName='<spring:message code="middleCategoryName"/>'; //중분류명
var subCategoryName='<spring:message code="subCategoryName"/>'; //소분류명
var majorCategoryDetail='<spring:message code="majorCategoryDetail"/>'; //대분류상세
var middleCategoryDetail='<spring:message code="middleCategoryDetail"/>'; //중분류상세
var subCategoryDetail='<spring:message code="subCategoryDetail"/>'; //소분류상세
var addRow='<spring:message code="addRow"/>'; //행추가
var delRow='<spring:message code="delRow"/>'; //행삭제
var rowNumber='<spring:message code="rowNumber"/>'; //순번
var categoryCode='<spring:message code="categoryCode"/>'; //코드
var employeeNumber='<spring:message code="employeeNumber"/>'; //담당사원번호
var employeeName='<spring:message code="employeeName"/>'; //담당자
var itemGubun='<spring:message code="itemGubun"/>'; //생식구분
var cusName='<spring:message code="cusName"/>'; //회원명
var cusNo='<spring:message code="cusNo"/>'; //회원번호
var busiFlag='<spring:message code="busiFlag"/>'; //회원구분
var mbrGrade='<spring:message code="mbrGrade"/>'; //회원등급
var mobilNo='<spring:message code="mobilNo"/>'; //휴대전화
var addr='<spring:message code="addr"/>'; //주소
var addrDtl='<spring:message code="addrDtl"/>'; //상세주소
var corpCode='<spring:message code="corpCode"/>'; //기업코드
var itmName='<spring:message code="itmName"/>'; //상품명
var itmCode='<spring:message code="itmCode"/>'; //상품코드
var scanCode='<spring:message code="scanCode"/>'; //스캔코드
var unit='<spring:message code="unit"/>'; //단위
var dpPrcUnit='<spring:message code="dpPrcUnit"/>'; //단위
var ipsuQty='<spring:message code="ipsuQty"/>'; //입수
var venName='<spring:message code="venName"/>'; //협력업체명
var baseWprc='<spring:message code="baseWprc"/>'; //기준원가
var venCode='<spring:message code="venCode"/>'; //협력업체코드
var itmShortName='<spring:message code="itmShortName"/>'; //단축상품명
var busiNo='<spring:message code="busiNo"/>'; //사업자번호
var gPassword='<spring:message code="gPassword"/>'; //비밀번호
var storCode='<spring:message code="storCode"/>'; //점포코드

var storNm='<spring:message code="storNm"/>'; //점포명
var inqireYear='<spring:message code="inqireYear"/>'; //조회년도
var se='<spring:message code="se"/>'; //구분
var selngAm='<spring:message code="selngAm"/>'; //매출액
var selngProfit='<spring:message code="selngProfit"/>'; //매출이익
var selngProfitGoal='<spring:message code="selngProfitGoal"/>'; //매출/매출이익 목표
var goodsClAcctoGoal='<spring:message code="goodsClAcctoGoal"/>'; //상품분류별 목표
var unit1000='<spring:message code="unit1000"/>'; //(단위:천원)
var selngGoalManagePop='<spring:message code="selngGoalManagePop"/>'; //매출목표관리 팝업
var IrdsRtBndeApplc='<spring:message code="IrdsRtBndeApplc"/>'; //증감율(%) 일괄 적용
var CreatYear='<spring:message code="CreatYear"/>'; //생성년도
var ReferYear='<spring:message code="ReferYear"/>'; //참고년도
var sm='<spring:message code="sm"/>'; //합계
var subTotal='<spring:message code="subTotal"/>'; //소계
var mt='<spring:message code="mt"/>'; //월
var goodsCl='<spring:message code="goodsCl"/>'; //상품분류
var yy='<spring:message code="yy"/>'; //년
var goodsClMiddl='<spring:message code="goodsClMiddl"/>'; //상품분류(중)
var yymt='<spring:message code="yymt"/>'; //상품분류(중)
var plateContents='<spring:message code="plateContents"/>'; //명판내용
var characterLength='<spring:message code="characterLength"/>'; //문자길이
var deptCode='<spring:message code="deptCode"/>'; //부서코드
var deptName='<spring:message code="deptName"/>'; //부서명
var upperDept='<spring:message code="upperDept"/>'; //상위코드
var grade='<spring:message code="grade"/>'; //레벨
var orgType='<spring:message code="orgType"/>'; //조직구분
var saleYn='<spring:message code="saleYn"/>'; //매출점구분
var storeCode='<spring:message code="storeCode"/>';//점포코드
var storeName='<spring:message code="storeName"/>';//점포명
var eventCode='<spring:message code="eventCode"/>'; //행사코드
var eventName='<spring:message code="eventName"/>';//행사명
var eventDate='<spring:message code="eventDate"/>';//행사기간
var eventStartDate='<spring:message code="eventStartDate"/>';//행사시작일
var eventEndDate='<spring:message code="eventEndDate"/>'; //행사종료일
var orderStartDate='<spring:message code="orderStartDate"/>'; //발주시작일
var orderEnddate='<spring:message code="orderEnddate"/>'; //발주종료일
var eventType='<spring:message code="eventType"/>'; //행사구분
var evtType='<spring:message code="evtType"/>'; //행사타입
var inputDate='<spring:message code="inputDate"/>'; //등록일
var inputNo='<spring:message code="inputNo"/>'; //등록자사원번호
var inputName='<spring:message code="inputName"/>'; //등록자
var remark='<spring:message code="remark"/>'; //적요
var occurDate='<spring:message code="occurDate"/>'; //발생일자
var point='<spring:message code="point"/>'; //포인트
var reasonGubun='<spring:message code="reasonGubun"/>'; //사유구분
var detailMemo='<spring:message code="detailMemo"/>'; //상세메모
var staffNo='<spring:message code="staffNo"/>'; //사원번호
var deptNm='<spring:message code="deptNm"/>'; //조직명
var sysGubun='<spring:message code="sysGubun"/>'; //업무구분
var sprc='<spring:message code="sprc"/>'; //판매단가

var time='<spring:message code="time"/>'; //시간
var occurTime='<spring:message code="occurTime"/>'; //발생시간
var totalSales='<spring:message code="totalSales"/>'; //매출합계
var taxFreeSales='<spring:message code="taxFreeSales"/>'; //면세합계
var taxableSales='<spring:message code="taxableSales"/>'; //과세합계
var cashAppr='<spring:message code="cashAppr"/>'; //현금승인
var supplyProductSales='<spring:message code="supplyProductSales"/>'; //협력업체상품매출

var baseWprcCmn='<spring:message code="baseWprcCmn"/>'; //기준원가(공통)
var baseSprcCmn='<spring:message code="baseSprcCmn"/>'; //기준매가(공통)
var wprcStore='<spring:message code="wprcStore"/>'; //원가단가(점)
var sprcStore='<spring:message code="sprcStore"/>'; //매가단가(점)

var lastSalesDt='<spring:message code="lastSalesDt"/>'; //최종매출일
var lastDepositDt='<spring:message code="lastDepositDt"/>'; //최종입금일

var staff='<spring:message code="staff"/>'; //사원
var staffClassification='<spring:message code="staffClassification"/>'; //직원구분
var classification='<spring:message code="classification"/>'; //재직구분
var staffLlist='<spring:message code="staffLlist"/>'; //사원목록
var staffDetailInformation='<spring:message code="staffDetailInformation"/>'; //사원정보 상세
var staffId='<spring:message code="staffId"/>'; //사원ID
var staffName='<spring:message code="staffName"/>'; //사원명
var position='<spring:message code="position"/>'; //직급
var rank='<spring:message code="rank"/>'; //순위
var departmentName='<spring:message code="departmentName"/>'; //부서명
var password='<spring:message code="password"/>'; //비밀번호
var mobilePhoneNumber='<spring:message code="mobilePhoneNumber"/>'; //휴대폰번호
var departmentCode='<spring:message code="departmentCode"/>'; //부서코드
var rightsGroup='<spring:message code="rightsGroup"/>'; //권한그룹
var passwordInitialProcessing='<spring:message code="passwordInitialProcessing"/>'; //비밀번호 초기처리
var noticeDate='<spring:message code="noticeDate"/>'; //공지일자
var noticeEndDate='<spring:message code="noticeEndDate"/>'; //공지종료일자
var locationType='<spring:message code="locationType"/>'; //위치구분
var hotkeyNumber='<spring:message code="hotkeyNumber"/>'; //단축키번호
var hotkeyName='<spring:message code="hotkeyName"/>'; //단축키명
var automaticNumbering='<spring:message code="automaticNumbering"/>'; //자동발번

var notice='<spring:message code="notice"/>'; //공지사항
var title='<spring:message code="title"/>'; //제목
var pd='<spring:message code="pd"/>'; //기간
var contents='<spring:message code="contents"/>'; //내용
var atchmnfl='<spring:message code="atchmnfl"/>'; //첨부파일

var fileDelete='<spring:message code="fileDelete"/>'; //파일삭제
var noticeNumber='<spring:message code="noticeNumber"/>'; //공지번호
var stopDay='<spring:message code="stopDay"/>'; //종료일
var cashReceipts='<spring:message code="cashReceipts"/>'; //현금영수증
var email='<spring:message code="email"/>'; //=이메일
var receiveEmail='<spring:message code="receiveEmail"/>'; //=이메일 수신
var directInput='<spring:message code="directInput"/>'; //=직접입력
var receiveSMS='<spring:message code="receiveSMS"/>'; //=SMS 수신
var membershipCard='<spring:message code="membershipCard"/>'; //=멤버십카드
var cardNo='<spring:message code="cardNo"/>'; //카드번호
var issueStore='<spring:message code="issueStore"/>'; //발급점
var issueDate='<spring:message code="issueDate"/>'; //발급일자
var cardIssuanceReason='<spring:message code="cardIssuanceReason"/>'; //카드발급사유
var ductYm='<spring:message code="ductYm"/>'; // 공제년월
var payCon='<spring:message code="payCon"/>'; // 지불주기
var paySeq='<spring:message code="paySeq"/>'; // 지불차수
var ductCode='<spring:message code="ductCode"/>'; // 공제코드
var requestDt='<spring:message code="requestDt"/>'; // 요청일자
var ductAmt='<spring:message code="ductAmt"/>'; // 공제금액
var ductTotal='<spring:message code="ductTotal"/>'; // 공제합계
var totDuctAmt='<spring:message code="totDuctAmt"/>'; // 총공제금액
var requestEmp='<spring:message code="requestEmp"/>'; // 요청사원
var holdCode='<spring:message code="holdCode"/>'; // 보류코드
var holdAmt='<spring:message code="holdAmt"/>'; // 보류금액
var payCfmYn='<spring:message code="payCfmYn"/>'; // 대금원장 반영유무
var releHoldDt='<spring:message code="releHoldDt"/>'; // 해제요청일자
var releHoldYm='<spring:message code="releHoldYm"/>'; // 해제반영월
var remark2='<spring:message code="remark2"/>'; // 해제사유
var releCfmYn='<spring:message code="releCfmYn"/>'; // 해제원장 반영유무
var managerName='<spring:message code="managerName"/>'; // 관리자명
var memberCompanyName='<spring:message code="memberCompanyName"/>'; // 회원(업체)명
var mainPhone='<spring:message code="mainPhone"/>'; // 대표전화
var usePoints='<spring:message code="usePoints"/>'; // 포인트사용유무
var useCredit='<spring:message code="useCredit"/>'; // 여신유무
var creditLimit='<spring:message code="creditLimit"/>'; // 여신한도
var industFlag='<spring:message code="industFlag"/>'; // 업종유형
var discountApplied='<spring:message code="discountApplied"/>'; // 할인적용여부
var discountRate='<spring:message code="discountRate"/>'; // 할인율
var publishType='<spring:message code="publishType"/>'; // 발행구분
var totHoldAmt='<spring:message code="totHoldAmt"/>'; // 총보류금액
var greGb='<spring:message code="greGb"/>'; // 거래구분
var purClose='<spring:message code="purClose"/>'; // 매입집계
var saleClose='<spring:message code="saleClose"/>'; // 매출집계
var jangClose='<spring:message code="jangClose"/>'; // 장려금마감
var orgCreat='<spring:message code="orgCreat"/>'; // 지불원장생성
var payClose='<spring:message code="payClose"/>'; // 지불마감
var uDate='<spring:message code="uDate"/>'; // 처리일자
var payYm='<spring:message code="payYm"/>'; // 지불년월
var payTgtAmt='<spring:message code="payTgtAmt"/>'; // 이월금액(기 반영보류)
var payable='<spring:message code="payable"/>'; // 지불대상금액
var payNetAmt='<spring:message code="payNetAmt"/>'; // 실지불액
var holdCancleAmt='<spring:message code="holdCancleAmt"/>'; // 보류해제금액
var bankAcown='<spring:message code="bankAcown"/>'; // 예금주
var bankCode='<spring:message code="bankCode"/>'; // 거래은행
var bankAccNo='<spring:message code="bankAccNo"/>'; // 계좌번호
var payAmt='<spring:message code="payAmt"/>'; // 결제금액
var nextCreditLimit='<spring:message code="nextCreditLimit"/>'; // 이월여신한도
var paymentAmount='<spring:message code="paymentAmount"/>'; // 지불금액
var adjustAmt='<spring:message code="adjustAmt"/>'; // 조정금액
var availAmt='<spring:message code="availAmt"/>'; // 가용여신한도
var purDt='<spring:message code="purDt"/>'; // 매입일자
var purSeDt='<spring:message code="purSeDt"/>'; // 매입기간
var purDecisionDt='<spring:message code="purDecisionDt"/>'; // 매입확정일자
var taxGb='<spring:message code="taxGb"/>'; // 과세구분
var ordFlag='<spring:message code="ordFlag"/>'; // 매입형태
var decQty='<spring:message code="decQty"/>'; // 매입수량
var purSprc='<spring:message code="purSprc"/>'; // 매가단가
var purSamt='<spring:message code="purSamt"/>'; // 매가금액
var routeGb='<spring:message code="routeGb"/>'; // 배송구분
var botSprc='<spring:message code="botSprc"/>'; // 공병단가
var botSum='<spring:message code="botSum"/>'; // 공병금액
var docNo='<spring:message code="docNo"/>'; // 전표번호
var docDate='<spring:message code="docDate"/>'; // 전표일자
var cmisRate='<spring:message code="cmisRate"/>'; // 수수료율
var cmisAmt='<spring:message code="cmisAmt"/>'; // 수수료액

var yes='<spring:message code="yes"/>'; //예
var no='<spring:message code="no"/>'; //아니요

var searchStartDate='<spring:message code="searchStartDate"/>'; //조회시작일
var searchEndDate='<spring:message code="searchEndDate"/>'; //조회종료일

var orderMth='<spring:message code="orderMth"/>'; // 주문방법
var orderRceptSm='<spring:message code="orderRceptSm"/>'; // 주문접수집계
var storeTy='<spring:message code="storeTy"/>'; // 점포별
var bsnEmpl='<spring:message code="bsnEmpl"/>'; // 영업사원
var memberGroup='<spring:message code="memberGroup"/>'; // 회원그룹

var qu='<spring:message code="qu"/>'; // 분기
var co='<spring:message code="co"/>'; // 건수
var amount='<spring:message code="amount"/>'; // 금액

var nonPerformingPurchaseAssignmentStatus='<spring:message code="nonPerformingPurchaseAssignmentStatus"/>'; //무실적(매입/대입)현황 
var allStop='<spring:message code="allStop"/>'; //일괄중지 
var number='<spring:message code="number"/>'; // 번호
var large='<spring:message code="large"/>'; //대 
var medium='<spring:message code="medium"/>'; //중  
var small='<spring:message code="small"/>'; //소

var bestWorst20='<spring:message code="bestWorst20"/>'; //best/worst20선
var selngDate='<spring:message code="selngDate"/>'; //매출일자
var inqireStdr='<spring:message code="inqireStdr"/>'; //조회기준
var qY='<spring:message code="qY"/>'; //수량
var bestWorst20Sttus='<spring:message code="bestWorst20Sttus"/>'; //best/worst20현황

var saleQy='<spring:message code="saleQy"/>'; //판매수량
var cmpntrt='<spring:message code="cmpntrt"/>'; //구성비
var cstmrCnt='<spring:message code="cstmrCnt"/>'; //고객수
var goodsClSmall='<spring:message code="goodsClSmall"/>'; //상품분류(소)
var memberPerformance='<spring:message code="memberPerformance"/>'; //회원실적
var previousYear='<spring:message code="previousYear"/>'; //전년도
var theYear='<spring:message code="theYear"/>'; //당년도
var increase='<spring:message code="increase"/>'; //증감
var changeMembershipLevel='<spring:message code="changeMembershipLevel"/>'; //회원등급변경
var txtNow='<spring:message code="txtNow"/>'; //현재
var txtChange='<spring:message code="txtChange"/>'; //변경

var daySalesSettlement='<spring:message code="daySalesSettlement"/>'; //일매출정산집계조회
var resiDualCash='<spring:message code="resiDualCash"/>'; //잔전현금
var bottleSales='<spring:message code="bottleSales"/>'; //공병매출
var cashDeposit='<spring:message code="cashDeposit"/>'; //현금입금
var totalDeposit='<spring:message code="totalDeposit"/>'; //입금합계
var accntReceivalbe='<spring:message code="accntReceivalbe"/>'; //외상매출입금
var salesByPOS='<spring:message code="salesByPOS"/>'; //POS별매출집계

var ThngPrflosSttus='<spring:message code="ThngPrflosSttus"/>'//단품별손익현황
var PrmpcAmount='<spring:message code="PrmpcAmount"/>'//원가금액
var ProfitRt='<spring:message code="ProfitRt"/>'//이익율
var profitAmt='<spring:message code="profitAmt"/>'//이익액
 
var bsnSttus='<spring:message code="bsnSttus"/>';//영업점별현황
var goodsClSttus='<spring:message code="goodsClSttus"/>';//상품분류별현황
var lsmthCyfdAm='<spring:message code="lsmthCyfdAm"/>';//전월이월액
var thsMon='<spring:message code="thsMon"/>';//당월
var puchasAmount='<spring:message code="puchasAmount"/>';//매입금액
var lonAmount='<spring:message code="lonAmount"/>';//대출금액
var deAmount='<spring:message code="deAmount"/>';//대입금액
var selngAmount='<spring:message code="selngAmount"/>';//매출금액	
var selngPrice='<spring:message code="selngPrice"/>';//매출단가	
var incrseAmount='<spring:message code="incrseAmount"/>';//인상금액
var rdctnAmount='<spring:message code="rdctnAmount"/>';//인하금액
var thsMonInvntryAmount='<spring:message code="thsMonInvntryAmount"/>';//당월재고액
var goodsInvntrySearch='<spring:message code="goodsInvntrySearch"/>';//상품재고조회
var memberDiscountRate='<spring:message code="memberDiscountRate"/>';//회원할인율
var referenceValue='<spring:message code="referenceValue"/>';//기준값
var availablePoints='<spring:message code="availablePoints"/>';//사용가능포인트
var cashRate='<spring:message code="cashRate"/>';//현금적립율
var cardRate='<spring:message code="cardRate"/>';//신용카드적립율
var pointRate='<spring:message code="pointRate"/>';//포인트적립율
var creditRate='<spring:message code="creditRate"/>';//외상적립율
var etcRate='<spring:message code="etcRate"/>';//기타적립율
var baseMinAmt='<spring:message code="baseMinAmt"/>';//최소기준값
var baseMaxAmt='<spring:message code="baseMaxAmt"/>';//최대기준값

var visits='<spring:message code="visits"/>';//방문횟수
var reservationDate='<spring:message code="reservationDate"/>';//예약발송일시
var txtTime='<spring:message code="txtTime"/>';//시
var txtMinute='<spring:message code="txtMinute"/>';//분

var goodsAbcAnalysis='<spring:message code="goodsAbcAnalysis"/>';//상품ABC분석
var taxInclusion='<spring:message code="taxInclusion"/>';//세포함
var taxExclusion='<spring:message code="taxExclusion"/>';//세제외
var selngPrimeCost='<spring:message code="selngPrimeCost"/>';//매출원가

var selngBreakingNews='<spring:message code="selngBreakingNews"/>';//매출속보(시간대별)
var reSearch='<spring:message code="reSearch"/>';//재조회

var selngAcmsltSearch='<spring:message code="selngAcmsltSearch"/>'//매출실적조회
var selngAcmslt='<spring:message code="selngAcmslt"/>'//매출실적
var monthAcmtl='<spring:message code="monthAcmtl"/>'//당월누계
var goalAmount='<spring:message code="goalAmount"/>'//목표액
var yearAcmtl='<spring:message code="yearAcmtl"/>'//당해년누계


var periodSellingActualResult='<spring:message code="periodSellingActualResult"/>'//기간별매출실적
var provisDate='<spring:message code="provisDate"/>'//대비일자
var unitPrice='<spring:message code="unitPrice"/>'//객단가
var selngPer='<spring:message code="selngPer"/>'//매출구성비
var selngIrDsAmount='<spring:message code="selngIrDsAmount"/>'//매출증감액
var irDsPer='<spring:message code="irDsPer"/>'//신장율
var unitIrDs='<spring:message code="unitIrDs"/>'//객수증감
var provisResult='<spring:message code="provisResult"/>'//대비결과
	

var payMnSelngStatus='<spring:message code="payMnSelngStatus"/>'//지불수단별매출현황
var storePaymentMn='<spring:message code="storePaymentMn"/>'//점포별지불수단
var datePaymentMn='<spring:message code="datePaymentMn"/>'//일자별지불수단
var per='<spring:message code="per"/>'//비율(%)
var cash='<spring:message code="cash"/>'//현금
var card='<spring:message code="card"/>'//신용카드
var creditSelling='<spring:message code="creditSelling"/>'//외상매출
var etc='<spring:message code="etc"/>'//기타


var monthSellingTransitionAnalysis='<spring:message code="monthSellingTransitionAnalysis"/>'//월별매출추이분석
var sellingTransition='<spring:message code="sellingTransition"/>'//매출추이
var goodsClTransition='<spring:message code="goodsClTransition"/>'//상품분류별추이
	
	
	
var cashReceiptAccessDetail='<spring:message code="cashReceiptAccessDetail"/>'//현금영수증적립내역
var cashReceiptPublicationDetail='<spring:message code="cashReceiptPublicationDetail"/>'//현금영수증발행내역
var dealingsNumber='<spring:message code="dealingsNumber"/>'//거래번호
var sellingSection='<spring:message code="sellingSection"/>'//매출구분
var certificationNumber='<spring:message code="certificationNumber"/>'//인증번호
var publicationAmount='<spring:message code="publicationAmount"/>'//발행금액
var customerNumber='<spring:message code="customerNumber"/>'//고객번호
var customerNm='<spring:message code="customerNm"/>'//고객명


var selngTRSearch='<spring:message code="selngTRSearch"/>'//매출TR조회
var chitFlag='<spring:message code="chitFlag"/>'//전표구분
var selngTR='<spring:message code="selngTR"/>'//매출TR
var selngDetail='<spring:message code="selngDetail"/>'//매출상세
var amountSum='<spring:message code="amountSum"/>'//금액합계
var cashier='<spring:message code="cashier"/>'//계산원
var memberCard='<spring:message code="memberCard"/>'//회원카드
var standard='<spring:message code="standard"/>'//규격
var obtainment='<spring:message code="obtainment"/>'//입수

var cardCode='<spring:message code="cardCode"/>'//카드사코드
var cardCompanyNm='<spring:message code="cardCompanyNm"/>'//카드사명
var cardPrefix='<spring:message code="cardPrefix"/>'//카드식별번호
var cardNm='<spring:message code="cardNm"/>'//카드명칭
var bankNm='<spring:message code="bankNm"/>'//은행명
var cardIssuer='<spring:message code="cardIssuer"/>'//카드발급사
var standardMl='<spring:message code="standardMl"/>'//기준(ml)
var salesMl='<spring:message code="salesMl"/>'//판매(ml)
var overMl='<spring:message code="overMl"/>'//초과(ml)
var name='<spring:message code="name"/>'//성명
var postAddr='<spring:message code="postAddr"/>'//우편번호

var date='<spring:message code="date"/>'//일자
var categoryNm='<spring:message code="categoryNm"/>'//분류명
var pricing='<spring:message code="pricing"/>'//가격

var memSalesList='<spring:message code="memSalesList"/>'//회원매출목록
var memSalesDtl='<spring:message code="memSalesDtl"/>'//회원매출상세

var saleTime='<spring:message code="saleTime"/>'//판매시간
var sumAmount='<spring:message code="sumAmount"/>'//합계금액
var eventDc='<spring:message code="eventDc"/>'//행사할인
var bigEventDc='<spring:message code="bigEventDc"/>'//특가할인

/** 사용자관리 화면 */ 
var msgUserPw='<spring:message code="msgUserPw"/>'; //최초 비밀번호는 사원ID로 등록됩니다.
var msgComment='<spring:message code="msgComment"/>'; //비밀번호 초기화시 비밀번호는 사용자 아이디로 초기화 됩니다.
var msgInsertComment='<spring:message code="msgInsertComment"/>'; //사원을 신규등록 하시겠습니까?
var msgUpdateComment='<spring:message code="msgUpdateComment"/>'; //사원정보를 수정 하시겠습니까?
var msgValidateComment1='<spring:message code="msgValidateComment1"/>'; //사용자ID는 필수입력 입니다.
var msgValidateComment2='<spring:message code="msgValidateComment2"/>'; //이미 사용중인 사용자ID 입니다.
var msgValidateComment3='<spring:message code="msgValidateComment3"/>'; //사원명는 필수입력 입니다.
var msgValidateComment4='<spring:message code="msgValidateComment4"/>'; //휴대폰번호는 필수입력 입니다.
var msgValidateComment5='<spring:message code="msgValidateComment5"/>'; //잘못된 휴대폰 번호입니다.
var msgValidateComment6='<spring:message code="msgValidateComment6"/>'; //부서코드는 필수입력 입니다.
var msgValidateComment7='<spring:message code="msgValidateComment7"/>'; //직급은 필수입력 입니다.
var msgValidateComment8='<spring:message code="msgValidateComment8"/>'; //직원구분은 필수입력 입니다.
var msgValidateComment9='<spring:message code="msgValidateComment9"/>'; //권한그룹은 필수입력 입니다.
var msgValidateComment10='<spring:message code="msgValidateComment10"/>'; //재직구분은 필수입력 입니다.
var msgValidateComment11='<spring:message code="msgValidateComment11"/>'; //사원을 선택하세요.
var msgResetPW='<spring:message code="msgResetPW"/>'; //비밀번호를 초기화 하시겠습니까?
var msgComplatePW='<spring:message code="msgComplatePW"/>'; //비밀번호가 초기화 되었습니다.

var msgDoubleClick='<spring:message code="msgDoubleClick"/>'; //더블클릭 시 공지사항 상세내역을 확인할 수 있습니다.
var msgCanRegister='<spring:message code="msgCanRegister"/>'; // 회원 등록 후 멤버십카드 등록이 가능합니다!

var bsnSttusTxt='<spring:message code="bsnSttusTxt"/>';//(조회년월 당월인 경우 당월재고액은 시스셈일자 기준 전 일자 재고를 나타냄)


var goalContrastAchiv='<spring:message code="goalContrastAchiv"/>';//목표대비달성율	
var goodsClAcmSlt='<spring:message code="goodsClAcmSlt"/>';//상품분류별실적	
var oraginSelngAm='<spring:message code="oraginSelngAm"/>';//순매출	
var goal='<spring:message code="goal"/>';//목표		
var acmSlt='<spring:message code="acmSlt"/>';//실적		
var achivPer='<spring:message code="achivPer"/>';//달성율		
var selngProfitAm='<spring:message code="selngProfitAm"/>';//매출이익	
var selngProfitPer='<spring:message code="selngProfitPer"/>';//매출이익율	

var inventoryTurnoverAnalysis='<spring:message code="inventoryTurnoverAnalysis"/>';//재고회전율분석
var basis='<spring:message code="basis"/>';//기초
var trmend='<spring:message code="trmend"/>';//기말
var inventoryTurnover='<spring:message code="inventoryTurnover"/>';//재고회전율(%)
var average='<spring:message code="average"/>'//평균


var creditCardSummationStatus='<spring:message code="creditCardSummationStatus"/>'//신용카드집계현황
var cardCompany='<spring:message code="cardCompany"/>'//카드사
var creditCardSummation='<spring:message code="creditCardSummation"/>'//신용카드집계
var cardCompanyAccording='<spring:message code="cardCompanyAccording"/>'//카드사별
var dateAccording='<spring:message code="dateAccording"/>'//일자별
var dealingsAccording='<spring:message code="dealingsAccording"/>'//거래건별
var normality='<spring:message code="normality"/>'//정상
var returnningGoods='<spring:message code="returnningGoods"/>'//반품
var sellingDate='<spring:message code="sellingDate"/>'//매출일자
var dealingsDate='<spring:message code="dealingsDate"/>'//거래일자
var dealingsNumber='<spring:message code="dealingsNumber"/>'//거래번호
var cardNumber='<spring:message code="cardNumber"/>'//카드번호
var consentNumber='<spring:message code="consentNumber"/>'//승인번호
var consentDate='<spring:message code="consentDate"/>'//승인날짜

var originalDealingsNumber='<spring:message code="originalDealingsNumber"/>';//원거래번호



var goodsMaster='<spring:message code="goodsMaster"/>';//상품마스터
var enterpriseChangeRegister='<spring:message code="enterpriseChangeRegister"/>';//업체변경등록
var txtChangeTarget='<spring:message code="txtChangeTarget"/>';//변경대상
var txtChangeBeforeVan='<spring:message code="txtChangeBeforeVan"/>';//변경 전 협력업체
var txtChangeVan='<spring:message code="txtChangeVan"/>';//변경 협력업체
var txtChangeStr='<spring:message code="txtChangeStr"/>';//적용 결과
var commonGoods='<spring:message code="commonGoods"/>';//공통상품
var count='<spring:message code="count"/>';//건
var success='<spring:message code="success"/>';//성공
var msgVanSelected='<spring:message code="msgVanSelected"/>';//협력업체를 선택 해주세요.
var msgChangeTarget='<spring:message code="msgChangeTarget"/>';//변경대상을 선택 해주세요.
var msgChangeBeforeVan='<spring:message code="msgChangeBeforeVan"/>';//변경 전 협력업체를 선택 해주세요.
var msgChangeVan='<spring:message code="msgChangeVan"/>';//변경 협력업체를 선택 해주세요.

var ct='<spring:message code="ct"/>'//객수
var goodsStoreSales='<spring:message code="goodsStoreSales"/>'//상품분류별 점포별 매출현황

/**조직마스터관리 화면*/
var msgOrganization='<spring:message code="msgOrganization"/>'; //신규 조직 추가시 왼쪽 트리메뉴를 선택하시면, 그 하위로 조직이 추가됩니다.
var organizationDetails='<spring:message code="organizationDetails"/>'; //조직정보 상세
var topGroupCode='<spring:message code="topGroupCode"/>'; //상위소속코드
var organizationType='<spring:message code="organizationType"/>'; //조직형태
var bizNo='<spring:message code="bizNo"/>'; //사업자등록번호
var ceoName='<spring:message code="ceoName"/>'; //대표자명
var business='<spring:message code="business"/>'; //업태
var sectors='<spring:message code="sectors"/>'; //종목
var category='<spring:message code="category"/>'; //업태구분
var startDay='<spring:message code="startDay"/>'; //시작일자
var area='<spring:message code="area"/>'; //면적
var parkingArea='<spring:message code="parkingArea"/>'; //주차장 면적
var accountingCode='<spring:message code="accountingCode"/>'; //회계코드
var faxNumber='<spring:message code="faxNumber"/>'; //FAX번호
var accountingDepartmentCode='<spring:message code="accountingDepartmentCode"/>'; //회계부서코드
var terminalID='<spring:message code="terminalID"/>'; //터미널ID
var centerCode='<spring:message code="centerCode"/>'; //센터코드
var daysOfSales='<spring:message code="daysOfSales"/>'; //매출일수
var signAmount='<spring:message code="signAmount"/>'; //사인금액
var mentOrganization1='<spring:message code="mentOrganization1"/>'; //영업지점은 하위 조직을 추가 할 수 없습니다. 
var mentOrganization2='<spring:message code="mentOrganization2"/>'; //트리에서 조직형태가 본부 또는 관리를 선택해 주세요.
var mentOrganization3='<spring:message code="mentOrganization3"/>'; //지점을 선택하세요.
var mentOrganization4='<spring:message code="mentOrganization4"/>'; //신규 조직을 작성중입니다.
var mentOrganization5='<spring:message code="mentOrganization5"/>'; //신규 입력을 위해 왼쪽 트리에서 조직을 선택하세요.
var mentOrganization6='<spring:message code="mentOrganization6"/>'; //트리메뉴에서 상위조직을 선택하세요.
var mentOrganization7='<spring:message code="mentOrganization7"/>'; //최상위 본부는 수정 할 수 없습니다.
var mentOrganization8='<spring:message code="mentOrganization8"/>'; //부서코드는 필수입력 입니다.
var mentOrganization9='<spring:message code="mentOrganization9"/>'; //부서코드는 최소4자리 입니다.
var mentOrganization10='<spring:message code="mentOrganization10"/>'; //중복된 부서코드가 있습니다.
var mentOrganization11='<spring:message code="mentOrganization11"/>'; //부서명은 필수입력 입니다.
var mentOrganization12='<spring:message code="mentOrganization12"/>'; //부서명은 최소 2자입니다.
var mentOrganization13='<spring:message code="mentOrganization13"/>'; //조직형태는 필수입력 입니다.
var mentOrganization14='<spring:message code="mentOrganization14"/>'; //사용유무는 필수입력 입니다.
var mentOrganization15='<spring:message code="mentOrganization15"/>'; //대표자성명은 필수입력 입니다.
var mentOrganization16='<spring:message code="mentOrganization16"/>'; //업태는 필수입력 입니다.
var mentOrganization17='<spring:message code="mentOrganization17"/>'; //종목은 필수입력 입니다.
var mentOrganization18='<spring:message code="mentOrganization18"/>'; //주소는 필수입력 입니다.
var mentOrganization19='<spring:message code="mentOrganization19"/>'; //업태구분은 필수입력 입니다.
var mentOrganization20='<spring:message code="mentOrganization20"/>'; //시작일자는 필수입력 입니다.
var mentOrganization21='<spring:message code="mentOrganization21"/>'; //회계코드는 필수입력 입니다.
var mentOrganization22='<spring:message code="mentOrganization22"/>'; //회계코드는 최소 4자리입니다.
var mentOrganization23='<spring:message code="mentOrganization23"/>'; //사업자등록번호를 입력 해 주세요.
var mentOrganization24='<spring:message code="mentOrganization24"/>'; //잘못된 사업자등록번호 입니다.
var mentOrganization25='<spring:message code="mentOrganization25"/>'; //회계부서코드는 필수입력 입니다.
var mentOrganization26='<spring:message code="mentOrganization26"/>'; //회계부서코드는 최소 4자리입니다.
var mentOrganization27='<spring:message code="mentOrganization27"/>'; //터미널ID는 필수입력입니다.
var mentOrganization28='<spring:message code="mentOrganization28"/>'; //센터코드는 필수입력입니다.
var mentOrganization29='<spring:message code="mentOrganization29"/>'; //매출일수는 필수입력입니다.
var mentOrganization30='<spring:message code="mentOrganization30"/>'; //사인금액은 필수입력입니다.

var initl='<spring:message code="initl"/>'; //초기화
var greTypeNm='<spring:message code="greTypeNm"/>';//거래형태

var deliverySummationStatus='<spring:message code="deliverySummationStatus"/>';//배달집계현황
var today='<spring:message code="today"/>';//당일
var orderPhone='<spring:message code="orderPhone"/>';//주문(전화)
var visitBurial='<spring:message code="visitBurial"/>';//방문(매장)

var purchaseChitStatus='<spring:message code="purchaseChitStatus"/>';//매입전표현황
var purchaseChitDetail='<spring:message code="purchaseChitDetail"/>';//매입전표상세

var inputSection='<spring:message code="inputSection"/>';//입력구분
var purchaseVAT='<spring:message code="purchaseVAT"/>';//매입VAT
var salePrcSum='<spring:message code="salePrcSum"/>';//매가합계
var msgStartDateAndEndDate='<spring:message code="msgStartDateAndEndDate"/>';//시작 일자가 종료 일자보다 클수 없습니다.
var storePurchaseChitStatus='<spring:message code="storePurchaseChitStatus"/>';//점포별매입전표현황

var memberMisDoc='<spring:message code="memberMisDoc"/>';//회원별미수원장

var referYearMonth='<spring:message code="referYearMonth"/>';//참고년월

var deliveryList='<spring:message code="deliveryList"/>';//배달목록
var deliveryDetail='<spring:message code="deliveryDetail"/>';//배달상세내역
var deliverySearch='<spring:message code="deliverySearch"/>';//배달내역조회

var businessEmployee='<spring:message code="businessEmployee"/>';//영업사원


var purchaseReturn='<spring:message code="purchaseReturn"/>';//매입반품	
var termEndInventoryCost='<spring:message code="termEndInventoryCost"/>';//기말재고원가
var taxExclusionSelling='<spring:message code="taxExclusionSelling"/>';//세제외매출
var inventoryResult='<spring:message code="inventoryResult"/>';//재고결과현황

var codeTop='<spring:message code="codeTop"/>';//코드(대)
var categoryNmTop='<spring:message code="categoryNmTop"/>';//분류명(대)
var codeMid='<spring:message code="codeMid"/>';//코드(중)
var categoryNmMid='<spring:message code="categoryNmMid"/>';//분류명(중)
var codeBotton='<spring:message code="codeBotton"/>';//코드(소)
var categoryNmBotton='<spring:message code="categoryNmBotton"/>';//분류명(소)
var termEndInventorySprc='<spring:message code="termEndInventorySprc"/>';//기말재고매가

var pointAccumulationStatus='<spring:message code="pointAccumulationStatus"/>';//포인트적립/사용현황
var accumulationScore='<spring:message code="accumulationScore"/>';//적립점수


/** 입고조회/수정 화면 */
var dateOfReceipt='<spring:message code="dateOfReceipt"/>'; //입고일자
var stockStatus='<spring:message code="stockStatus"/>'; //입고현황
var realStock='<spring:message code="realStock"/>'; //현재고
var detailsWearing='<spring:message code="detailsWearing"/>'; //입고상세
var goodsReceiptNumber='<spring:message code="goodsReceiptNumber"/>'; //입고번호
var goodsReceiptType='<spring:message code="goodsReceiptType"/>'; //입고구분
var orderAmount='<spring:message code="orderAmount"/>'; //발주금액
var amountOfGoodsReceipt='<spring:message code="amountOfGoodsReceipt"/>'; //입고금액
var dateConfirmed='<spring:message code="dateConfirmed"/>'; //확정일자
var purchaseCost='<spring:message code="purchaseCost"/>'; //매입원가
var orderQuantity='<spring:message code="orderQuantity"/>'; //발주수량
var quantityReceived='<spring:message code="quantityReceived"/>'; //입고수량
var mentWmsIn1='<spring:message code="mentWmsIn1"/>'; //값을 입력하세요.
var mentWmsIn2='<spring:message code="mentWmsIn2"/>'; //값은 숫자만 가능합니다.
var mentWmsIn3='<spring:message code="mentWmsIn3"/>'; //발주수량보다 값이 클 수 없습니다.
var mentWmsIn4='<spring:message code="mentWmsIn4"/>'; //저장할 입고 목록을 선택하세요.
var mentWmsIn5='<spring:message code="mentWmsIn5"/>'; //확정된 입고정보는 수정 할 수 없습니다.
var mentWmsIn6='<spring:message code="mentWmsIn6"/>'; //확정할 입고현황을 체크박스로 선택하세요.
var mentWmsIn7='<spring:message code="mentWmsIn7"/>'; //체크하신 목록을 입고확정 하시겠습니까?
var mentWmsIn8='<spring:message code="mentWmsIn8"/>'; //확정처리 되었습니다.
var mentWmsIn9='<spring:message code="mentWmsIn9"/>'; //납품수량보다 값이 클 수 없습니다.
var orderNumber='<spring:message code="orderNumber"/>'; //발주번호
var price='<spring:message code="price"/>'; //판매가
var totalPurchaseCost='<spring:message code="totalPurchaseCost"/>'; //총매입원가
var quantityDeliveryRates='<spring:message code="quantityDeliveryRates"/>'; //납품율
var nonQty='<spring:message code="nonQty"/>'; //미납수량
var statusOfNonPayment='<spring:message code="statusOfNonPayment"/>'; //미납현황
var purchasePrice='<spring:message code="purchasePrice"/>'; //매입단가
var orderAmount='<spring:message code="orderAmount"/>'; //주문금액
var deliveryQuantity='<spring:message code="deliveryQuantity"/>'; //납품수량
var inspectionDate='<spring:message code="inspectionDate"/>'; //검품일자

var batchExecution='<spring:message code="batchExecution"/>'; //배치 실행
var createDate='<spring:message code="createDate"/>'; //생성년월
var monthGoodsRcvPayCreate='<spring:message code="monthGoodsRcvPayCreate"/>'; //월상품수불장 생성 배치 실행
var monthGoodsRcvPaySearch='<spring:message code="monthGoodsRcvPaySearch"/>'; //월상품수불장조회
var dateGoodsRcvPaySearch='<spring:message code="dateGoodsRcvPaySearch"/>'; //일상품수불장조회
var goodsClAccto='<spring:message code="goodsClAccto"/>'; //상품분류별
var goodsClAcctoTrot='<spring:message code="goodsClAcctoTrot"/>'; //상품분류별속보
var theDayBeforeStockQy='<spring:message code="theDayBeforeStockQy"/>'; //전일재고수량
var purchaseSprc='<spring:message code="purchaseSprc"/>'; //매입매가
var sellingQy='<spring:message code="sellingQy"/>'; //매출수량
var sellingSprc='<spring:message code="sellingSprc"/>'; //매출매가
var deQy='<spring:message code="deQy"/>'; //대입수량
var dePrmpc='<spring:message code="dePrmpc"/>'; //대입원가
var deSprc='<spring:message code="deSprc"/>'; //대입매가
var loanQy='<spring:message code="loanQy"/>'; //대출수량
var loanPrmpc='<spring:message code="loanPrmpc"/>'; //대출원가
var loanSprc='<spring:message code="loanSprc"/>'; //대출매가
var inventoryMediationQy='<spring:message code="inventoryMediationQy"/>'; //재고조정수량
var inventoryMediationPrmpc='<spring:message code="inventoryMediationPrmpc"/>'; //재고조정원가
var inventoryMediationSprc='<spring:message code="inventoryMediationSprc"/>'; //재고조정매가
var trmendInventoryQy='<spring:message code="trmendInventoryQy"/>'; //기말재고수량

var inventoryState='<spring:message code="inventoryState"/>'; //단품별재고현황

var eventGoodsLogSearch='<spring:message code="eventGoodsLogSearch"/>';//행사상품로그조회
var normalityPurchase='<spring:message code="normalityPurchase"/>';//정상매입가
var normalityMargin='<spring:message code="normalityMargin"/>';//정상마진
var eventPurchase='<spring:message code="eventPurchase"/>';//행사매입가
var eventMargin='<spring:message code="eventMargin"/>';//행사마진

/**출고조회/수정 화면*/
var expectedDateOfDelivery='<spring:message code="expectedDateOfDelivery"/>'; //출고예정일자
var logisticsShipmentStatus='<spring:message code="logisticsShipmentStatus"/>'; //출고현황
var logisticsShipmentDetails='<spring:message code="logisticsShipmentDetails"/>'; //출고상세
var shippingNumber='<spring:message code="shippingNumber"/>'; //출고번호
var theNumberOfShipments='<spring:message code="theNumberOfShipments"/>'; //출고건수
var totalShipmentAmount='<spring:message code="totalShipmentAmount"/>'; //총출고금액
var shippingUnitPrice='<spring:message code="shippingUnitPrice"/>'; //출고단가
var logisticsShipmentQuantity='<spring:message code="logisticsShipmentQuantity"/>'; //출고수량
var mentWmsOut1='<spring:message code="mentWmsOut1"/>'; //저장할 출고 목록을 선택하세요.
var mentWmsOut2='<spring:message code="mentWmsOut2"/>'; //확정된 출고정보는 수정 할 수 없습니다.
var mentWmsOut3='<spring:message code="mentWmsOut3"/>'; //확정할 출고현황을 체크박스로 선택하세요.
var mentWmsOut4='<spring:message code="mentWmsOut4"/>'; //체크하신 목록을 출고확정 하시겠습니까?
var deliveryDate='<spring:message code="deliveryDate"/>'; //출고일자
var approvedDeliveryDates='<spring:message code="approvedDeliveryDates"/>'; //출고확정일자
var DateOfReceiptConfirmation='<spring:message code="DateOfReceiptConfirmation"/>'; //입고확정일자
var orderQuantity='<spring:message code="orderQuantity"/>'; //주문수량
var nonPaymentOutflowStatus='<spring:message code="nonPaymentOutflowStatus"/>'; //미/오출현황
var nonPaymentOutflowQuantity='<spring:message code="nonPaymentOutflowQuantity"/>'; //미/오출수량

/**재고조사일정관리*/
var detailedInventorySurveySchedule='<spring:message code="detailedInventorySurveySchedule"/>'; //재고조사 일정 상세
var inventorySurveyScheduleID='<spring:message code="inventorySurveyScheduleID"/>'; //재고조사일정 ID
var inventorySurveyScheduleDate='<spring:message code="inventorySurveyScheduleDate"/>'; //재고조사일자
var inventorySurveyClassification='<spring:message code="inventorySurveyClassification"/>'; //재고조사구분
var inventorySurveyMethod='<spring:message code="inventorySurveyMethod"/>'; //재고조사방법
var inventorySurveyPeriod='<spring:message code="inventorySurveyPeriod"/>'; //재고조사기간
var scopeOfInvestigation='<spring:message code="scopeOfInvestigation"/>'; //조사범위
var inventorySurveyDueDate='<spring:message code="inventorySurveyDueDate"/>'; //재고실사입력일
var inventoryAdjustmentReflectedDate='<spring:message code="inventoryAdjustmentReflectedDate"/>'; //재고조정반영일
var inventorySurveySchedule='<spring:message code="inventorySurveySchedule"/>'; //재고조사 일정
var inventorySurveyMent1='<spring:message code="inventorySurveyMent1"/>'; //선택하신 일정은 재고실사가 이루워져 수정 할 수 없습니다.
var inventorySurveyMent2='<spring:message code="inventorySurveyMent2"/>'; //점포명은 필수입력 입니다.
var inventorySurveyMent3='<spring:message code="inventorySurveyMent3"/>'; //점포코드는 필수입력 입니다.
var inventorySurveyMent4='<spring:message code="inventorySurveyMent4"/>'; //재고조사일정ID는 필수입력 입니다.
var inventorySurveyMent5='<spring:message code="inventorySurveyMent5"/>'; //재고조사일자는 필수입력 입니다.
var inventorySurveyMent6='<spring:message code="inventorySurveyMent6"/>'; //재고조사구분은 필수입력 입니다.
var inventorySurveyMent7='<spring:message code="inventorySurveyMent7"/>'; //재고조사방법은 필수입력 입니다.
var inventorySurveyMent8='<spring:message code="inventorySurveyMent8"/>'; //재고조사기간은 필수입력 입니다.
var inventorySurveyMent9='<spring:message code="inventorySurveyMent9"/>'; //재고조사기간의 시작일은 종료일보다 클 수 없습니다.
var inventorySurveyMent10='<spring:message code="inventorySurveyMent10"/>'; //선택한 조직은 재조조사일정을 등록 할 수 없습니다.
var inventorySurveyMent11='<spring:message code="inventorySurveyMent11"/>'; //재고조사기간이 지나 수정 할 수 없습니다.
var inventorySurveyMent12='<spring:message code="inventorySurveyMent12"/>'; //오늘날짜보다 작을 수 없습니다.


/**실사재고등록*/
var stockRealMent1='<spring:message code="stockRealMent1"/>'; //점포의 취급상품의 스캐닝코드만 등록 가능 합니다. 그외의 상품의 스캐닝코드는 등록 할 수 없습니다.
var stockRealMent2='<spring:message code="stockRealMent2"/>'; //엑셀업로드, 행추가 후 상단의 "저장"을 하셔야 반영이 됩니다.
var stockRealMent3='<spring:message code="stockRealMent3"/>'; //행삭제, 확정수량 조정 후 상단의 저장버튼을 클릭 하셔야 반영이 됩니다.
var stockRealMent4='<spring:message code="stockRealMent4"/>'; //점포는 필수입력 입니다.
var stockRealMent5='<spring:message code="stockRealMent5"/>'; //점포를 선택하세요.
var stockRealMent6='<spring:message code="stockRealMent6"/>'; //재고조사일정ID를 선택하세요.
var stockRealMent7='<spring:message code="stockRealMent7"/>'; //선택하신 재고실사조사가 완료되어 행추가를 할 수 없습니다.
var stockRealMent8='<spring:message code="stockRealMent8"/>'; //선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
var stockRealMent9='<spring:message code="stockRealMent9"/>'; //엑셀파일을 선택하세요.
var stockRealMent10='<spring:message code="stockRealMent10"/>'; //xls,xlsx 파일만 업로드 할수 있습니다.
var stockRealMent11='<spring:message code="stockRealMent11"/>'; //업로드 하시겠습니까?
var stockRealMent12='<spring:message code="stockRealMent12"/>'; //모든 데이터가 업로드 되었습니다.
var stockRealMent13='<spring:message code="stockRealMent13"/>'; //내용 확인 후 저장하여 서버에 등록하세요.
var stockRealMent14='<spring:message code="stockRealMent14"/>'; //엑셀 업로드 데이터중 점포코드, 스캐닝코드, 조사수량, 매장구분의
var stockRealMent15='<spring:message code="stockRealMent15"/>'; //데이터 형식이 잘못 되었습니다.
var stockRealMent16='<spring:message code="stockRealMent16"/>'; //데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
var stockRealMent17='<spring:message code="stockRealMent17"/>'; //저장할 데이터가 없습니다.
var stockRealMent18='<spring:message code="stockRealMent18"/>'; //확정할 데이터가 없습니다
var stockRealMent19='<spring:message code="stockRealMent19"/>'; //수정된 값이 존재합니다. 먼저 저장 하신 후 확정 할 수 있습니다.
var stockRealMent20='<spring:message code="stockRealMent20"/>'; //재고조사를 확정처리 하시겠습니까?
var stockRealMent21='<spring:message code="stockRealMent21"/>'; //삭제할 재고목록을 선택해 해주세요.
var stockRealMent22='<spring:message code="stockRealMent22"/>'; //실사재고가 확정되어 삭제 할 수 없습니다.
var stockRealMent23='<spring:message code="stockRealMent23"/>'; //데이터 조회를 해주세요.
var stockRealMent24='<spring:message code="stockRealMent24"/>'; //스캐닝 코드는 필수입력 입니다.
var stockRealMent25='<spring:message code="stockRealMent25"/>'; //조사수량은 필수입력 입니다.
var stockRealMent26='<spring:message code="stockRealMent26"/>'; //직매입상품이 아닙니다. 스캐닝코드를 확인하세요.
var stockRealMent27='<spring:message code="stockRealMent27"/>'; //저장버튼을 클릭하여, 계속 재고등록을 할 수 있습니다.
var stockRealMent28='<spring:message code="stockRealMent28"/>'; //조회된 상품이 없습니다. 스캐닝코드를 확인하세요.
var storeType='<spring:message code="storeType"/>'; //매장구분
var dueDiligenceInventoryRegister='<spring:message code="dueDiligenceInventoryRegister"/>'; //실사재고등록
var actualStockInquiry='<spring:message code="actualStockInquiry"/>'; //실사재고조회(확정)
var scanningCode='<spring:message code="scanningCode"/>'; //스캐닝코드
var surveyQuantity='<spring:message code="surveyQuantity"/>'; //조사수량
var actualQuantity='<spring:message code="actualQuantity"/>'; //실사수량
var stockAmount='<spring:message code="stockAmount"/>'; //재고금액
var investigator='<spring:message code="investigator"/>'; //조사자
var theDayBeforeStock='<spring:message code="theDayBeforeStock"/>'; //전일재고
var fixedQuantity='<spring:message code="fixedQuantity"/>'; //확정수량
var differenceQuantity='<spring:message code="differenceQuantity"/>'; //차이수량

/**재고조정등록*/
var adjustmentDate='<spring:message code="adjustmentDate"/>'; //조정일자
var reasonForAdjustment='<spring:message code="reasonForAdjustment"/>'; //조정사유
var approvalStatus='<spring:message code="approvalStatus"/>'; //확정구분
var inventoryAdjustmentList='<spring:message code="inventoryAdjustmentList"/>'; //재고조정 목록
var adjustedQuantity='<spring:message code="adjustedQuantity"/>'; //조정수량
var inventoryAdjustmentRegistration='<spring:message code="inventoryAdjustmentRegistration"/>'; //재고조정 등록
var stockChangeMent1='<spring:message code="stockChangeMent1"/>'; //조회된 목록을 더블클릭하여 수정 할 수 있습니다.
var stockChangeMent2='<spring:message code="stockChangeMent2"/>'; //점포의 취급상품만 등록 가능 합니다.
var stockChangeMent3='<spring:message code="stockChangeMent3"/>'; //확정된 재고조정 정보는 삭제 할수 없습니다.
var stockChangeMent4='<spring:message code="stockChangeMent4"/>'; //조회된 상품이 없습니다.
var stockChangeMent5='<spring:message code="stockChangeMent5"/>'; //조정사유를 선택하세요.
var stockChangeMent6='<spring:message code="stockChangeMent6"/>'; //조정수량을 입력하세요.
var stockChangeMent7='<spring:message code="stockChangeMent7"/>'; //재고수량보다 조정수량이 클 수 없습니다.

/**실사재고엑셀등록*/
var inventoryDate='<spring:message code="inventoryDate"/>'; //재고실사일
var inventoryDayBefore='<spring:message code="inventoryDayBefore"/>'; //전 재고실사일
var quantityDifference='<spring:message code="quantityDifference"/>'; //수량차이
var dueDiligenceInventoryId='<spring:message code="dueDiligenceInventoryId"/>'; //실사재고ID
var storeTypeCode='<spring:message code="storeTypeCode"/>'; //매장종류코드
var purchaseSales='<spring:message code="purchaseSales"/>'; //매입/매출
var purchaseSales2='<spring:message code="purchaseSales2"/>'; //매입(매출)
var accountingBookQuantity='<spring:message code="accountingBookQuantity"/>'; //장부수량
var quantityDifference='<spring:message code="quantityDifference"/>'; //수량차이
var beforeQuantityDifference='<spring:message code="beforeQuantityDifference"/>'; //전 수량차이
var supplyUnitPrice='<spring:message code="supplyUnitPrice"/>'; //공급단가
var differenceCost='<spring:message code="differenceCost"/>'; //차이원가
var differenceSellingPrice='<spring:message code="differenceSellingPrice"/>'; //차이매가
var stockExcelMent1='<spring:message code="stockExcelMent1"/>'; //조회조건에 맞는 실사재고목록 조회후 엑셀을 다운받아, 실사수량을 수정한 뒤 엑셀업로드를 해야 합니다.
var stockExcelMent2='<spring:message code="stockExcelMent2"/>'; //엑셀업로드 후 상단의 저장버튼을 클릭 하셔야 반영이 됩니다.
var stockExcelMent3='<spring:message code="stockExcelMent3"/>'; //재고실사일이 존재하지 않습니다.
var stockExcelMent4='<spring:message code="stockExcelMent4"/>'; //엑셀 업로드 데이터 형식이 잘못 되었습니다.
var stockExcelMent5='<spring:message code="stockExcelMent5"/>'; //데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
var stockExcelMent6='<spring:message code="stockExcelMent6"/>'; //업로드된 엑셀데이터가 없습니다.

/**WMS실사재고등록*/
var wmsStockRealMent1='<spring:message code="wmsStockRealMent1"/>'; //Location을 먼저 선택하신 후 스캐닝코드를 입력하세요. 저장버튼을 클릭하여, 계속 재고등록을 할 수 있습니다.
var wmsStockRealMent2='<spring:message code="wmsStockRealMent2"/>'; //ZONE은 필수선택입니다.
var wmsStockRealMent3='<spring:message code="wmsStockRealMent3"/>'; //RACK은 필수선택입니다.
var wmsStockRealMent4='<spring:message code="wmsStockRealMent4"/>'; //LINE은 필수선택입니다.
var wmsStockRealMent5='<spring:message code="wmsStockRealMent5"/>'; //업로드 데이터중 점포코드, ,LINE코드, 스캐닝코드, 조사수량, 매장구분의
var wmsStockRealMent6='<spring:message code="wmsStockRealMent6"/>'; //데이터중 점포코드, LINE코드, 스캐닝코드, 조사수량, 매장구분의
var wmsStockRealMent7='<spring:message code="wmsStockRealMent7"/>'; //Location은 필수 선택입니다.
var stockQty='<spring:message code="stockQty"/>'; //재고수량
var wmsTitle='<spring:message code="wmsTitle"/>'; //Location별 재고현황

/** 메뉴 관련화면 */
var menuInformation='<spring:message code="menuInformation"/>'; //메뉴 기능 설명
var menuOrderMsg='<spring:message code="menuOrderMsg"/>'; //메뉴 기능 설명
var menuDetail='<spring:message code="menuDetail"/>'; //메뉴 상세정보
var upMenuName='<spring:message code="upMenuName"/>'; //상위 메뉴명
var menuID='<spring:message code="menuID"/>'; //메뉴 아이디
var menuName='<spring:message code="menuName"/>'; //메뉴명
var menuClassName='<spring:message code="menuClassName"/>'; //클래스명
var menuGubun='<spring:message code="menuGubun"/>'; //메뉴구분
var topMenu='<spring:message code="topMenu"/>'; //최상위메뉴
var middleMenu='<spring:message code="middleMenu"/>'; //중간메뉴
var bottonMenu='<spring:message code="bottonMenu"/>'; //하위메뉴
var sortOrder='<spring:message code="sortOrder"/>'; //정렬순번
var textFavoritesAdd='<spring:message code="textFavoritesAdd"/>'; //즐겨찾기가 추가되었습니다.
var textFavoritesDel='<spring:message code="textFavoritesDel"/>'; //즐겨찾기가 해제되었습니다.

/** 공통팝업 관련화면 */
var memberSearchPop='<spring:message code="memberSearchPop"/>'; //회원검색 팝업
var productSearchPop='<spring:message code="productSearchPop"/>'; //상품검색 팝업
var supplySearchPop='<spring:message code="supplySearchPop"/>'; //협력업체검색 팝업
var userSearchPop='<spring:message code="userSearchPop"/>'; //사원검색 팝업
var eventProductSearchPop='<spring:message code="eventProductSearchPop"/>'; //행사상품검색 팝업
var deptSearchPop='<spring:message code="deptSearchPop"/>'; //부서검색 팝업
var storeProductSearchPop='<spring:message code="storeProductSearchPop"/>'; //점별상품검색 팝업
var storePop='<spring:message code="storePop"/>'; //점포검색팝업
var member='<spring:message code="member"/>'; //회원
var product='<spring:message code="product"/>'; //상품
var supply='<spring:message code="supply"/>'; //협력업체
var eventProduct='<spring:message code="eventProduct"/>'; //행사상품
var dept='<spring:message code="dept"/>'; //부서
var eventPop='<spring:message code="eventPop"/>'; //행사검색 팝업
var giftPop='<spring:message code="giftPop"/>'; //사은행사검색 팝업

/** 포인트임의관리 화면 */
var memberInfo='<spring:message code="memberInfo"/>'; //회원정보
var birthDate='<spring:message code="birthDate"/>'; //생년월일
var sex='<spring:message code="sex"/>'; //성별
var supplyName='<spring:message code="supplyName"/>'; //업체명
var memberPoint='<spring:message code="memberPoint"/>'; //회원포인트
var salPoint='<spring:message code="salPoint"/>'; //누적포인트
var minusPoint='<spring:message code="minusPoint"/>'; //사용포인트
var salUpPoint='<spring:message code="salUpPoint"/>'; //가용포인트
var pointOptionStatus='<spring:message code="pointOptionStatus"/>'; //임의등록현황
var pointOptionStatusDetail='<spring:message code="pointOptionStatusDetail"/>'; //포인트임의등록내역

/** 행사상품마스터 화면 */
var campnMasterSearch='<spring:message code="campnMasterSearch"/>'; //행사관리조회
var campnProductInfo='<spring:message code="campnProductInfo"/>'; //행사상품정보
var taxGubun='<spring:message code="taxGubun"/>'; //부가세
var baseWPRC='<spring:message code="baseWPRC"/>'; //기초원가(부가세제외)
var baseSPRC='<spring:message code="baseSPRC"/>'; //기초매가(부가세제외)
var baseWVAT='<spring:message code="baseWVAT"/>'; //기초원가(부가세)
var baseTOTAL='<spring:message code="baseTOTAL"/>'; //기초원가(부가세포함)
var evtWPRC='<spring:message code="evtWPRC"/>'; //행사원가(부가세제외)
var evtWVAT='<spring:message code="evtWVAT"/>'; //행사원가(부가세)
var evtTOTAL='<spring:message code="evtTOTAL"/>'; //행사원가(부가세포함)
var sprc='<spring:message code="sprc"/>'; //정상매가
var evtSPRC='<spring:message code="evtSPRC"/>'; //행사매가
var margin='<spring:message code="margin"/>'; //마진율(정상)
var marginEVT='<spring:message code="marginEVT"/>'; //마진율(행사)
var imageNumber='<spring:message code="imageNumber"/>'; //행사전단번호
var msgSelectEvent='<spring:message code="msgSelectEvent"/>'; //상단의 행사를 선택 후 입력이 가능합니다.
var msgSelectDelItem='<spring:message code="msgSelectDelItem"/>'; //삭제할 상품을 선택하세요.
var msgNoneItem='<spring:message code="msgNoneItem"/>'; //추가, 수정, 삭제된 행이 존재하지 않습니다.
var msgEventOtherStore='<spring:message code="msgEventOtherStore"/>'; //타 점포의 행사입니다.
var evtDetail='<spring:message code="evtDetail"/>'; //행사정보 상세
var cardBaseAmt='<spring:message code="cardBaseAmt"/>'; //카드기준금액
var dcFlag='<spring:message code="dcFlag"/>'; //할인구분
var dcAmt='<spring:message code="dcAmt"/>'; //할인금액
var productDc='<spring:message code="productDc"/>'; //상품할인
var memberDc='<spring:message code="memberDc"/>'; //회원할인
var dcRate='<spring:message code="dcRate"/>'; //할인율
var exchgPrtYn='<spring:message code="exchgPrtYn"/>'; //교환권출력구분
var print='<spring:message code="print"/>'; //출력
var nonePrint='<spring:message code="nonePrint"/>'; //미출력
var exchgBaseAmt='<spring:message code="exchgBaseAmt"/>'; //기준금액
var exchgConts='<spring:message code="exchgConts"/>'; //출력내용
var evtCardList='<spring:message code="evtCardList"/>'; //카드등록 정보
var msgEventOrderDate='<spring:message code="msgEventOrderDate"/>'; //발주일자는 행사종료일을 초과할 수 없습니다.
var msgDeleteEndEvent='<spring:message code="msgDeleteEndEvent"/>'; //종료된 행사는 삭제가 불가능합니다.
var msgDeleteIngEvent='<spring:message code="msgDeleteIngEvent"/>'; //진행중인 행사는 삭제가 불가능합니다.
var msgDeleteProductEvent='<spring:message code="msgDeleteProductEvent"/>'; //행사상품이 등록된 행사는 삭제가 불가능합니다.


/** 대금지불 */
var payDuctInfo='<spring:message code="payDuctInfo"/>'; // 공제등록 정보
var payDuctInfoReg='<spring:message code="payDuctInfoReg"/>'; // 공제정보 등록
var holdYm='<spring:message code="holdYm"/>'; // 보류년월
var holdInfoReg='<spring:message code="holdInfoReg"/>'; // 보류정보 등록
var releHoldInfoReg='<spring:message code="releHoldInfoReg"/>'; // 보류해제 등록
var holdRegInfo='<spring:message code="holdRegInfo"/>'; // 보류등록 정보
var holdRemark='<spring:message code="holdRemark"/>'; // 보류사유
var releHoldEmp='<spring:message code="releHoldEmp"/>'; // 해제요청사원
var releholdCon='<spring:message code="releholdCon"/>'; // 해제반영 지불주기
var releholdSeq='<spring:message code="releholdSeq"/>'; // 해제반영회차
var paymentDeadline='<spring:message code="paymentDeadline"/>'; // 지불 마감 조정
var paymentDeadlineMng='<spring:message code="paymentDeadlineMng"/>'; // 지불마감 관리
var requestForPayment='<spring:message code="requestForPayment"/>'; // 대금지불 의뢰서
var paymentType='<spring:message code="paymentType"/>'; // 결제용
var submitBank='<spring:message code="submitBank"/>'; // 은행제출용
var excelData='<spring:message code="excelData"/>'; // 엑셀데이터
var createLedger='<spring:message code="createLedger"/>'; // 원장생성
var payCreateLedger='<spring:message code="payCreateLedger"/>'; // 대금지불원장생성
var runLedger='<spring:message code="runLedger"/>'; // 집계실행
var cancleLedger='<spring:message code="cancleLedger"/>'; // 집계취소
var successLedger='<spring:message code="successLedger"/>'; // 집계가 완료되었습니다.
var cancellationLedger='<spring:message code="cancellationLedger"/>'; // 집계취소가 완료되었습니다.
var purchSearch='<spring:message code="purchSearch"/>'; // 매입조회
var purchTotal='<spring:message code="purchTotal"/>'; // 매입합계
var purchGubun='<spring:message code="purchGubun"/>'; // 매입구분
var botDeposit='<spring:message code="botDeposit"/>'; // 공병예수금
var botPurchTotal='<spring:message code="botPurchTotal"/>'; // 공병포함 원가 총계
var cancelFlag='<spring:message code="cancelFlag"/>'; // 취소구분
var salesHistorySearch='<spring:message code="salesHistorySearch"/>'; // 수수료 매출 내역 조회
var releAmt='<spring:message code="releAmt"/>'; // 기반영보류금액
var accountsPayable='<spring:message code="accountsPayable"/>';   // 미지급금
var accountsPayable2='<spring:message code="accountsPayable2"/>'; // 지불잔액 (미지급금)
var bankCodeCode='<spring:message code="bankCodeCode"/>'; // 은행코드
var resPayDt='<spring:message code="resPayDt"/>'; // 지불예정일자
var jangAmt='<spring:message code="jangAmt"/>'; // 매입장려금
var purchLedgerSummary='<spring:message code="purchLedgerSummary"/>'; // 매입집계 내역 조회
var saleseLedgerSummary='<spring:message code="saleseLedgerSummary"/>'; // 매출집계 내역 조회
var ledgerSummary='<spring:message code="ledgerSummary"/>'; // 수지불예정 내역
var checkClick='<spring:message code="checkClick"/>'; // 조회 후 해제할 항목을 선택해주세요.
var msgPayClose='<spring:message code="msgPayClose"/>'; // 지불마감 처리된 자료는 수정 할 수 없습니다.

/** 콜센터접수등록 */
var selectStore='<spring:message code="selectStore"/>'; //주문상품을 조회할 점포를 선택해야 합니다.
var qtyOver='<spring:message code="qtyOver"/>'; //입력한 수량이 재고 수량 보다 많습니다.
var orderDate='<spring:message code="orderDate"/>'; //주문일자
var invEndQty='<spring:message code="invEndQty"/>'; //재고
var wprc='<spring:message code="wprc"/>'; //단가
var cellSPRC='<spring:message code="cellSPRC"/>'; //판매금액
var selectCust='<spring:message code="selectCust"/>'; //주문 접수를 위해 회원을 먼저 검색해야 합니다.
var payType='<spring:message code="payType"/>'; //결제방법
var noneChangeData='<spring:message code="noneChangeData"/>'; //수정 또는 추가된 항목이 존재하지 않습니다.
var determineOrder='<spring:message code="determineOrder"/>'; //주문확정을 수행할 주문 내용을 등록 또는 조회하세요.
var confirmDetermine='<spring:message code="confirmDetermine"/>'; //해당 내용을 주문접수 하시겠습니까?
var confirmOrder='<spring:message code="confirmOrder"/>'; //해당 상품을 주문하시겠습니까?
var slipNo='<spring:message code="slipNo"/>'; //주문번호
var ordStat='<spring:message code="ordStat"/>'; //주문상태
var orderDate='<spring:message code="orderDate"/>'; //접수일자
var orderDatetime='<spring:message code="orderDatetime"/>'; //접수일시
var orderEmp='<spring:message code="orderEmp"/>'; //접수자
var registOrder='<spring:message code="registOrder"/>'; //주문접수
var reserveDate='<spring:message code="reserveDate"/>'; //배달요청일시
var acctReable='<spring:message code="acctReable"/>'; //미수채권
var creditUseLimit='<spring:message code="creditUseLimit"/>'; //가용한도
var orderAddr='<spring:message code="orderAddr"/>'; //배달주소
var orderProduct='<spring:message code="orderProduct"/>'; //주문상품
var duplicateProduct='<spring:message code="duplicateProduct"/>'; //이미 등록된 상품이 존재합니다.
var orderDeliveryMng='<spring:message code="orderDeliveryMng"/>'; //주문배달관리
var fishDate='<spring:message code="fishDate"/>'; //배달일자
var msgSelectOrder='<spring:message code="msgSelectOrder"/>'; //주문 접수할 항목을 선택하세요.
var msgSelectSlip='<spring:message code="msgSelectSlip"/>'; //조회할 주문번호를 입력하세요.
var msgOrderCantUpdate='<spring:message code="msgOrderCantUpdate"/>'; //배달완료 상태인 주문은 저장할 수 없습니다.
var msgProductNull='<spring:message code="msgProductNull"/>'; //주문내용이 공백이거나 수량이 0인 상품이 존재합니다.
var addrSame='<spring:message code="addrSame"/>'; //상동
var orderHistory='<spring:message code="orderHistory"/>'; //주문이력

/* Location 관리 */
var zoneCode='<spring:message code="zoneCode"/>'; //Zone
var zoneName='<spring:message code="zoneName"/>'; //Zone 이름
var rackCode='<spring:message code="rackCode"/>'; //Rack
var rackName='<spring:message code="rackName"/>'; //Rack 이름
var lineCode='<spring:message code="lineCode"/>'; //Line
var lineName='<spring:message code="lineName"/>'; //Line 이름
var categoryName='<spring:message code="categoryName"/>'; //Category 이름

/* 외상매출관리 */
var businessCredit='<spring:message code="businessCredit"/>'; //외상매출발생
var insertCredit='<spring:message code="insertCredit"/>'; //입금등록
var registCredit='<spring:message code="registCredit"/>'; //입금내역
var credit='<spring:message code="credit"/>'; //외상매출
var zanAmt='<spring:message code="zanAmt"/>'; //미수금
var dpotAmt='<spring:message code="dpotAmt"/>'; //입금액
var payPlanDt='<spring:message code="payPlanDt"/>'; //입금예정일
var rcpDt='<spring:message code="rcpDt"/>'; //입금일자
var dpotFlag='<spring:message code="dpotFlag"/>'; //결제수단
var payPeriod='<spring:message code="payPeriod"/>'; //할부개월
var dpotNo='<spring:message code="dpotNo"/>'; //입금번호
var iDateTime='<spring:message code="iDateTime"/>'; //등록일시
var dpotStrName='<spring:message code="dpotStrName"/>'; //입금점포
var dpotSlipNo='<spring:message code="dpotSlipNo"/>'; //입금전표번호
var msgSelectCredit='<spring:message code="msgSelectCredit"/>'; //입금등록을 수행할 외상건을 선택하세요.
var msgSelectDpot='<spring:message code="msgSelectDpot"/>'; //입금 등록할 내용을 입력해주세요. 
var msgSameCust='<spring:message code="msgSameCust"/>'; //동일한 사용자만 다중 입금등록이 가능합니다.
var msgDpotPayAmt='<spring:message code="msgDpotPayAmt"/>'; //입금할 금액이 외상매출 금액보다 클 수 없습니다.
var prePay='<spring:message code="prePay"/>'; //선입금액
var prePaySett='<spring:message code="prePaySett"/>'; //정산액
var prePayZanAmt='<spring:message code="prePayZanAmt"/>'; //선입금잔액

/* 프로모션 */
var promKinds='<spring:message code="promKinds"/>'; //프로모션유형
var promCode='<spring:message code="promCode"/>'; //프로모션코드
var promName='<spring:message code="promName"/>'; //프로모션 명
var eventDay='<spring:message code="eventDay"/>'; //행사일자
var cstmrType='<spring:message code="cstmrType"/>'; //대상고객
var eventKinds='<spring:message code="eventKinds"/>'; //행사유형
var orderDay='<spring:message code="orderDay"/>'; //발주기간
var prdCode1='<spring:message code="prdCode1"/>'; //상품코드(주)
var prdCode2='<spring:message code="prdCode2"/>'; //상품코드(부)
var qtyNAmt1='<spring:message code="qtyNAmt1"/>'; //수량(금액)1
var qtyNAmt2='<spring:message code="qtyNAmt2"/>'; //수량(금액)2
var qtyNAmt3='<spring:message code="qtyNAmt3"/>'; //수량(금액)3
var dcAmt1='<spring:message code="dcAmt1"/>'; //할인금액1
var dcAmt2='<spring:message code="dcAmt2"/>'; //할인금액2
var dcAmt3='<spring:message code="dcAmt3"/>'; //할인금액3
var buyref='<spring:message code="buyref"/>'; //구매기준
var dcRef='<spring:message code="dcRef"/>'; //할인기준
var pairCode='<spring:message code="pairCode"/>'; //묶음코드
var prdKinds='<spring:message code="prdKinds"/>'; //상품유형
var errCode='<spring:message code="errCode"/>'; //예외오류코드
var mainPrd='<spring:message code="mainPrd"/>'; //주상품(Buy)
var subPrd='<spring:message code="subPrd"/>'; //부상품(Get)
var etcPrd='<spring:message code="etcPrd"/>'; //기타(Normal)
var add = '<spring:message code="add"/>'; //추가
var apply = '<spring:message code="apply"/>'; //적용
var AmtDc1 = '<spring:message code="AmtDc1"/>'; //금액(수량)/할인금액1
var cstCode = '<spring:message code="cstCode"/>'; //회원코드
var grade = '<spring:message code="grade"/>'; //등급
var cstStr = '<spring:message code="cstStr"/>'; //관리점
var appStrDay = '<spring:message code="appStrDay"/>'; //적용시작일
var appEndDay = '<spring:message code="appEndDay"/>'; //적용종료일
var salePrc = '<spring:message code="salePrc"/>'; //적용일자
var dcPrc = '<spring:message code="dcPrc"/>'; //매가

/* 프로모션MSG */
var promMessg00='<spring:message code="promMessg00"/>'; //프로모션 상품마스터를 선택해주세요.
var promMessg01='<spring:message code="promMessg01"/>'; //프로모션 상품마스터를 선택해주세요.
var promMessg02='<spring:message code="promMessg02"/>'; //행사유형이 상품군일경우에만 금액(수량)을 입력할수 있습니다.
var promMessg03='<spring:message code="promMessg03"/>'; //행사유형이 다다익선일경우 구매/할인기준이 수량/정액또는 금액/정율만 가능합니다.
var promMessg04='<spring:message code="promMessg04"/>'; //행사유형이 상품군일경우 구매/할인기준이 금액/정율만 가능합니다.
var promMessg05='<spring:message code="promMessg05"/>'; //행사유형이 Mix&Match경우 구매/할인기준이 수량/정액만 가능합니다.
var promMessg06='<spring:message code="promMessg06"/>'; //동일한 행사유형을 같은 기간에 생성할수 없습니다.
var promMessg07='<spring:message code="promMessg07"/>'; //행사유형이 Mix&Metch일경우 주/부 상품을 모두 입력해야합니다.
var promMessg08='<spring:message code="promMessg08"/>'; //주상품을 반드시 입력해야합니다.
var promMessg09='<spring:message code="promMessg09"/>'; //하나 이상의 수량과 할인금액을 입력해야합니다.
var promMessg10='<spring:message code="promMessg10"/>'; //등록할 점포를 선택하세요.
var promMessg11='<spring:message code="promMessg11"/>'; //적용상품을 추가해야 적용할수 있습니다.
var promMessg12='<spring:message code="promMessg12"/>'; //행사유형이 상품군일경우 금액/수량입력이 불가능합니다.
var promMessg13='<spring:message code="promMessg13"/>'; //등록된 특단가상품정보의 대상점포는 변경할수 없습니다.
var promMessg14='<spring:message code="promMessg14"/>'; //등록된 특단가상품정보의 적용시작일자는 변경할수 없습니다.
var promMessg15='<spring:message code="promMessg15"/>'; //적용시작일이  종료일보다 클수 없습니다.
var promMessg16='<spring:message code="promMessg16"/>'; //동일한 상품을 적용기간내에 등록할수 없습니다.
/* 프로모션JSP-TITLE */
var promMstReg = '<spring:message code="promMstReg"/>'; //프로모션 상품마스터 등록
var promMstList = '<spring:message code="promMstList"/>'; //프로모션 상품마스터 내역
var promItmApply = '<spring:message code="promItmApply"/>'; //프로모션 적용 상품
var promStrItmReg = '<spring:message code="promStrItmReg"/>'; //프로모션 점 상품 등록
var promStrReg = '<spring:message code="promStrReg"/>'; //프로모션 점포 등록
var promStrRegDtl = '<spring:message code="promStrRegDtl"/>'; //프로모션 등록 상세
var specPrcCustom = '<spring:message code="specPrcCustom"/>'; //특,단가 적용회원
var specPrcItemReg = '<spring:message code="specPrcItemReg"/>'; //회원별 특단가 상품등록
var cstCodeName = '<spring:message code="cstCodeName"/>'; //회원번호/명
var specPriceItem = '<spring:message code="specPriceItem"/>'; //특단가 적용상품
var promStrItmList = '<spring:message code="promStrItmList"/>'; //프로모션 점 상품 내역 조회

/* 사은행사관리 */
var giftName='<spring:message code="giftName"/>'; //행사명
var giftList='<spring:message code="giftList"/>'; //사은행사목록
var giftCmpFlag='<spring:message code="giftCmpFlag"/>'; //사은행사구분
var giftChangeFlag='<spring:message code="giftChangeFlag"/>'; //교환권행사
var giftDt='<spring:message code="giftDt"/>'; //행사기간
var tgetCust='<spring:message code="tgetCust"/>'; //대상고객
var tgetStr='<spring:message code="tgetStr"/>'; //대상점포
var publishCnt='<spring:message code="publishCnt"/>'; //증정권 발행 매수
var gift='<spring:message code="gift"/>'; //사은품
var giftStrDt='<spring:message code="giftStrDt"/>'; //시작일
var giftEndDt='<spring:message code="giftEndDt"/>'; //종료일
var giftItmNm='<spring:message code="giftItmNm"/>'; //사은품명
var giftBaseAmt='<spring:message code="giftBaseAmt"/>'; //지급기준(매출금액/원)
var giftBaseMinAmt='<spring:message code="giftBaseMinAmt"/>'; //From
var giftBaseMaxAmt='<spring:message code="giftBaseMaxAmt"/>'; //To

/* 사은품 증정 */
var trxnPos='<spring:message code="trxnPos"/>'; //POS영수증 등록
var giveGiftItem='<spring:message code="giveGiftItem"/>'; //사은품 지급
var trxnNo='<spring:message code="trxnNo"/>'; //영수증
var msgSelectTrxnNo='<spring:message code="msgSelectTrxnNo"/>'; //사은품을 증정할 영수증을 선택하세요.
var msgSelectGiftItem='<spring:message code="msgSelectGiftItem"/>'; //지급할 사은품을 선택하세요.
var msgErrorTrxnData='<spring:message code="msgErrorTrxnData"/>'; //영수증 등록 데이터의 문제가 있습니다. 확인 후 다시 시도하세요.
var msgErrorGiftItem='<spring:message code="msgErrorGiftItem"/>'; //지급할 사은품의 수량을 입력하세요.
var msgSelectGift='<spring:message code="msgSelectGift"/>'; //조회할 행사를 선택하세요.

/* 카드프리픽스/주류판매대장 관리 */
var cardPrefixDet='<spring:message code="cardPrefixDet"/>'; //카드식별 번호 상세
var cardPrefixPop='<spring:message code="cardPrefixPop"/>'; //카드프리픽스 관리 팝업
var salesDt='<spring:message code="salesDt"/>'; //판매일자
var drinkSalesHistory='<spring:message code="drinkSalesHistory"/>'; //주류판매초과내역

/* 시세정보등록관리 */
var marketPriceList='<spring:message code="marketPriceList"/>'; //시세표목록
var itmDetPrice='<spring:message code="itmDetPrice"/>'; //상품시세상세

/* 기본상품마스터조회 */
var reptYn='<spring:message code="reptYn"/>'; //대표여부
var itmShortName='<spring:message code="itmShortName"/>'; //단축상품명
var strDt='<spring:message code="strDt"/>'; //취급일자
var endDt='<spring:message code="endDt"/>'; //취급중단일자
var itmGb='<spring:message code="itmGb"/>'; //상품구분
var inCapacity='<spring:message code="inCapacity"/>'; //제품용량
var dpPrcUnit='<spring:message code="dpPrcUnit"/>'; //표시용량
var makeVenName='<spring:message code="makeVenName"/>'; //제조사명
var orgName='<spring:message code="orgName"/>'; //원산지
var productWprc='<spring:message code="productWprc"/>'; //원가단가
var productSprc='<spring:message code="productSprc"/>'; //매가단가
var ftraceYn='<spring:message code="ftraceYn"/>'; //영유아식품이력
var straceYn='<spring:message code="straceYn"/>'; //수산물이력
var mtraceYn='<spring:message code="mtraceYn"/>'; //축산물이력
var ingrYn='<spring:message code="ingrYn"/>'; //공산식자재유무
var mbrDcYn='<spring:message code="mbrDcYn"/>'; //회원할인가능여부
var pointSave='<spring:message code="pointSave"/>'; //포인트적립여부
var giftAppYn='<spring:message code="giftAppYn"/>'; //사은품인정여부
var weightYn='<spring:message code="weightYn"/>'; //수중량관리여부
var tperMthd='<spring:message code="tperMthd"/>'; //보관방법
var validDtYn='<spring:message code="validDtYn"/>'; //유효관리유무
var validDD='<spring:message code="validDD"/>'; //유효일수
var idateCmn='<spring:message code="idateCmn"/>'; //등록일자(공통)
var udateCmn='<spring:message code="udateCmn"/>'; //수정일자(공통)
var iempNameCmn='<spring:message code="iempNameCmn"/>'; //등록자(공통)
var uempNameCmn='<spring:message code="uempNameCmn"/>'; //수정자(공통)
var idateStore='<spring:message code="idateStore"/>'; //등록일자(점)
var udateStore='<spring:message code="udateStore"/>'; //수정일자(점)
var iempNameStore='<spring:message code="iempNameStore"/>'; //등록자(점)
var uempNameStore='<spring:message code="uempNameStore"/>'; //수정자(점)
var itmMasterCmn='<spring:message code="itmMasterCmn"/>'; //상품 마스터(공통)

/** 외상매출미수채권 **/
 var beforeDay='<spring:message code="beforeDay"/>'; //전일이월
 var sameDay='<spring:message code="sameDay"/>'; //당일발생
 var depositDay='<spring:message code="depositDay"/>'; //당일입금
 var accruedBalance='<spring:message code="accruedBalance"/>'; //미수잔액
 var creditReceivables='<spring:message code="creditReceivables"/>'; //외상미수매출채권
 
 /* 클레임 */
 var claimStat='<spring:message code="claimStat"/>'; //처리상태
 var claimList='<spring:message code="claimList"/>'; //컴플레인목록
 var claimDetail='<spring:message code="claimDetail"/>'; //컴플레인상세
 var claimTp='<spring:message code="claimTp"/>'; //클레임유형
 var conts='<spring:message code="conts"/>'; //상세내역
 var claimManageSearch='<spring:message code="claimManageSearch"/>'; //컴플레인처리조회
 var manageDetail='<spring:message code="manageDetail"/>'; //처리상세
 var manageRowNum='<spring:message code="manageRowNum"/>'; //처리순번 
 var labelNew='<spring:message code="labelNew"/>'; //신규
 var msgInputDetail='<spring:message code="msgInputDetail"/>'; //처리상세 내용을 입력하세요.
 var inputManageDetail='<spring:message code="inputManageDetail"/>'; //처리내용등록
 var selectClaim='<spring:message code="selectClaim"/>'; //처리상세 내용을 등록하고자 하는 컴플레인 목록을 선택하세요.
 var noneAddClaim='<spring:message code="noneAddClaim"/>'; //진행상태가 완료인 클리엠건은 추가 처리내용을 등록 할 수 없습니다.
 var noneSaveClaim='<spring:message code="noneSaveClaim"/>'; //처리상태가 완료인 컴플레인건은 저장 할 수 없습니다.
 

/** 공통 오류 메시지 **/
var msgErrorLogout = '<spring:message code="msgErrorLogout"/>';
var msgErrorDefault = '<spring:message code="msgErrorDefault"/>';
var msgError0='<spring:message code="msgError0"/>';
var msgError404='<spring:message code="msgError404"/>';
var msgError500='<spring:message code="msgError500"/>';
var msgErrorParser='<spring:message code="msgErrorParser"/>';
var msgErrorTimeout='<spring:message code="msgErrorTimeout"/>';
var msgValueLength='<spring:message code="msgValueLength"/>'; //입력할 수 있는 문자열의 길이를 초과하였습니다.
var msgExistChild='<spring:message code="msgExistChild"/>'; //하위 값이 존재하여 삭제할 수 없습니다. 삭제후 다시 시도하세요.

/** 유효성검사와 관련된 메시지 출력 */
var msgDeleteMenu = '<spring:message code="msgDeleteMenu"/>'; //삭제할 메뉴를 선택하세요.
var msgSelectMenu = '<spring:message code="msgSelectMenu"/>'; //메뉴를 선택하세요.
var msgSelectCode = '<spring:message code="msgSelectCode"/>'; //코드를 선택하세요.
var msgNewMenu = '<spring:message code="msgNewMenu"/>'; //신규 메뉴를 작성중입니다.
var msgSelectUpMenu = '<spring:message code="msgSelectUpMenu"/>'; //신규 입력을 위해 왼쪽 트리 메뉴에서 메뉴를 선택하세요.
var msgSelectBottomMenu = '<spring:message code="msgSelectBottomMenu"/>'; //소메뉴 하위에는 메뉴를 추가할 수 없습니다. 대메뉴 또는 중메뉴를 선택하세요.
var msgMemberSearch = '<spring:message code="msgMemberSearch"/>'; //회원명 검색 후 조회해주세요.

var dcsnSave='<spring:message code="dcsnSave"/>'//확정되었습니다
var msgStorNmSelected='<spring:message code="msgStorNmSelected"/>'//점포명을 선택해주세요
var msgDcsnConfirm='<spring:message code="msgDcsnConfirm"/>'//선택항목을 확정 하시겠습니까?
var msgDeleteNo='<spring:message code="msgDeleteNo"/>'//삭제 할수 없습니다.
var msgDcsnSaveNo='<spring:message code="msgDcsnSaveNo"/>'//확정처리된 데이터는 저장할수 없습니다.
var msgCreateDataNo='<spring:message code="msgCreateDataNo"/>'//생성할 데이터가 없습니다.
var msgDateValidation='<spring:message code="msgDateValidation"/>'; //날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
var msgEventDateValidation='<spring:message code="msgEventDateValidation"/>'; //행사기간의 시작일이 종료일보다 클 수 없습니다.
var msgOrderDateValidation='<spring:message code="msgOrderDateValidation"/>'; //발주기간의 시작일이 종료일보다 클 수 없습니다.
var msgEventEndDate='<spring:message code="msgEventEndDate"/>'; //현재일보다 작은 일자를 종료일자로 입력할 수 없습니다.
var msgDuplicateStoreEvent='<spring:message code="msgDuplicateStoreEvent"/>';  //중복된 점포의 중복된 행사가 존재합니다.
var msgSelectData='<spring:message code="msgSelectData"/>'; //(을)를 선택하세요.
var msgSelectDelLRGCode='<spring:message code="msgSelectDelLRGCode"/>'; //삭제할 대분류를 선택 후 클릭하세요.
var msgSelectDelMIDCode='<spring:message code="msgSelectDelMIDCode"/>'; //삭제할 중분류를 선택 후 클릭하세요.
var msgSelectDelSMLCode='<spring:message code="msgSelectDelSMLCode"/>'; //삭제할 소분류를 선택 후 클릭하세요.
var msgInsertCodeMax='<spring:message code="msgInsertCodeMax"/>'; //등록가능한 코드의 갯수가 최대 입니다. 관리자에게 문의하세요.
var msgCommonInput='<spring:message code="msgCommonInput"/>'; //최소 한글2글자, 숫자/영문 4글자 이상 입력해주세요.
var msgContent10='<spring:message code="msgContent10"/>'; //내용은 10자이상 입니다.
var msgDeleteRowSel='<spring:message code="msgDeleteRowSel"/>'; //삭제할 행을 선택하세요.
var msgRegMemberSearch='<spring:message code="msgRegMemberSearch"/>'; //관리자 검색으로 등록 해주세요.
var msgBusinessTabSearch='<spring:message code="msgBusinessTabSearch"/>'; //사업자 탭 화면에서 조회 가능한 회원 입니다.
var msgMemberTabSearch='<spring:message code="msgMemberTabSearch"/>'; //개인 탭 화면에서 조회 가능한 회원 입니다.
var msgBusinessValid='<spring:message code="msgBusinessValid"/>'; //유효기간은 견적일자보다 큰 날짜를 선택해주세요.

var msgApplied='<spring:message code="msgApplied"/>'; //적용되었습니다.
var msgSelectData='<spring:message code="msgSelectData"/>'; //데이터를 선택 해주세요
var msgSearchData='<spring:message code="msgSearchData"/>'; //데이터 조회 후 이용해주세요.
var msgSmsNoReception='<spring:message code="msgSmsNoReception"/>'; //SMS 수신자를 선택해주세요.
var msgSendMMS='<spring:message code="msgSendMMS"/>'; //SMS 문자길이를 초과하여 MMS 로 전송 됩니다.
var msgSendSMS='<spring:message code="msgSendSMS"/>'; //SMS 로 전환되어 발송됩니다.
var msgSendSuccess='<spring:message code="msgSendSuccess"/>'; //문자 발송 성공하였습니다.
var msgSendFail='<spring:message code="msgSendFail"/>'; //문자 발송 실패하였습니다. 

/**긴급매가변경*/
var changedDay='<spring:message code="changedDay"/>'; //변경일
var urgentSaleRegistration='<spring:message code="urgentSaleRegistration"/>'; //긴급매가등록
var changeSalePrice='<spring:message code="changeSalePrice"/>'; //변경매가
var emergencySalesPriceRegistrationStatus='<spring:message code="emergencySalesPriceRegistrationStatus"/>'; //긴급매가등록현황
var modifiedDate='<spring:message code="modifiedDate"/>'; //수정일시
var emergencySalesMent1='<spring:message code="emergencySalesMent1"/>'; //당일등록한 상품만 수정 가능합니다.
var emergencySalesMent2='<spring:message code="emergencySalesMent2"/>'; //변경매가는 필수입력 입니다.

/**장려금생성관리**/
var pyIncentiveMenuName='<spring:message code="pyIncentiveMenuName"/>'; //장려금생성 관리
var pyJangMng='<spring:message code="pyJangMng"/>'; //장려금조정관리
var pyJangAmt='<spring:message code="pyJangAmt"/>'; //적용장려금
var pyCfmJangAmt='<spring:message code="pyCfmJangAmt"/>'; //장려금
var pyGugan='<spring:message code="pyGugan"/>'; //적용구간
var pyMinAmt='<spring:message code="pyMinAmt"/>'; //적용구간(최소금액)
var pyMaxAmt='<spring:message code="pyMaxAmt"/>'; //적용구간(최대금액)
var pyPurRate='<spring:message code="pyPurRate"/>'; //적용장려율
var pyApplMon='<spring:message code="pyApplMon"/>'; //적용월
var pyApplTgt='<spring:message code="pyApplTgt"/>'; //적용대상구분
var pyApplDt='<spring:message code="pyApplDt"/>'; //적용일자
var pyVenCurrJang='<spring:message code="pyVenCurrJang"/>'; //협력업체 장려금 현황
var pyJangGenPopup='<spring:message code="pyJangGenPopup"/>'; //장려금생성 팝업
var pyJangCanclePopup='<spring:message code="pyJangCanclePopup"/>'; //장려금취소 팝업
var pyNotiPopup='<spring:message code="pyNotiPopup"/>';             //선택한 년월에 해당하는 장려금을 생성합니다.
var pyNotiCanclePopup='<spring:message code="pyNotiCanclePopup"/>'; //선택한 년월에 해당하는 장려금을 취소합니다.
var pyJangDtPopup='<spring:message code="pyJangDtPopup"/>'; //작업년월
var msgJangGenConfirm='<spring:message code="msgJangGenConfirm"/>';       //선택하신 년월에 해당하는 장려금을 생성하시겠습니까?
var msgJangCancleConfirm='<spring:message code="msgJangCancleConfirm"/>'; //선택하신 년월에 해당하는 장려금을 취소하시겠습니까?
var msgJangGenComplete='<spring:message code="msgJangGenComplete"/>';       //장려금이 생성되었습니다.
var msgJangCancleComplete='<spring:message code="msgJangCancleComplete"/>'; //장려금이 취소되었습니다.

/**WMS 소분상품관리**/
var divDivisionMenuName='<spring:message code="divDivisionMenuName"/>'; //소분상품 관리
var divDvionDt='<spring:message code="divDvionDt"/>'; //소분일자
var divOriginProduct='<spring:message code="divOriginProduct"/>'; //원물상품
var divOriginScan='<spring:message code="divOriginScan"/>'; //스캔코드(원물)
var divOriginItm='<spring:message code="divOriginItm"/>'; //상품코드(원물)
var divTaxGb='<spring:message code="divTaxGb"/>'; //과세유무
var divDividedProduct='<spring:message code="divDividedProduct"/>'; //소분상품
var divDividedScan='<spring:message code="divDividedScan"/>'; //스캔코드(소분)
var divDividedItm='<spring:message code="divDividedItm"/>'; //상품코드(소분)
var divDivisionStatus='<spring:message code="divDivisionStatus"/>'; //소분상품 현황
var divDivisionQty='<spring:message code="divDivisionQty"/>'; //소분수량
var msgDivNewOrgConfirm='<spring:message code="msgDivNewOrgConfirm"/>'; //
var msgDivSearchWarning1='<spring:message code="msgDivSearchWarning1"/>'; //
var msgDivSearchWarning2='<spring:message code="msgDivSearchWarning2"/>'; //
var msgDivSearchWarning3='<spring:message code="msgDivSearchWarning3"/>'; //
var msgDivSearchWarning4='<spring:message code="msgDivSearchWarning4"/>'; //
var msgDivSearchWarning5='<spring:message code="msgDivSearchWarning5"/>'; //

/** 영업관리 > 매입관리 > 직매입 관련 각종 현황 조회 메뉴 리스트 컬럼명 & 타이틀 */
var r3ExpectedSAMT='<spring:message code="r3ExpectedSAMT"/>'; //판매예가
var r3ExpectedProfic='<spring:message code="r3ExpectedProfic"/>'; //예정이익
var r3purchTitle1='<spring:message code="r3purchTitle1"/>'; //상품별/일자별 매입 현황 상세
var r3purchTitle2='<spring:message code="r3purchTitle2"/>'; //단품별 매입/판매가 현황 상세
var r3purchTitle3='<spring:message code="r3purchTitle3"/>'; //직매입 현황 상세
var r3purchTitle4='<spring:message code="r3purchTitle4"/>'; //상품별 매입단가 현황 상세

/** 회원정보 > 멤버쉽관리 > 사업자매출현황 **/
var memStatMenuName='<spring:message code="memStatMenuName"/>'; //사업자매출현황
var memStatListTitle1='<spring:message code="memStatListTitle1"/>'; //사업자회원 매출
var memStatListTitle2='<spring:message code="memStatListTitle2"/>'; //일욜 요일별 매출
var memStatColumn1='<spring:message code="memStatColumn1"/>'; //매출년월
var memStatColumn2='<spring:message code="memStatColumn2"/>'; //일수
var memStatColumn3='<spring:message code="memStatColumn3"/>'; //요일
var memStatColumn4='<spring:message code="memStatColumn4"/>'; //사업자매출
var memStatColumn5='<spring:message code="memStatColumn5"/>'; //전일대비
var memStatColumnA1='<spring:message code="memStatColumnA1"/>'; //한식일반
var memStatColumnA2='<spring:message code="memStatColumnA2"/>'; //한식고기
var memStatColumnA3='<spring:message code="memStatColumnA3"/>'; //한식요리
var memStatColumnA4='<spring:message code="memStatColumnA4"/>'; //한식수산
var memStatColumnB1='<spring:message code="memStatColumnB1"/>'; //분식일반
var memStatColumnB2='<spring:message code="memStatColumnB2"/>'; //분식전문
var memStatColumnC1='<spring:message code="memStatColumnC1"/>'; //일식전문
var memStatColumnC2='<spring:message code="memStatColumnC2"/>'; //일식참치
var memStatColumnD1='<spring:message code="memStatColumnD1"/>'; //중식전문
var memStatColumnE1='<spring:message code="memStatColumnE1"/>'; //경양식/커피
var memStatColumnF1='<spring:message code="memStatColumnF1"/>'; //부페
var memStatColumnF2='<spring:message code="memStatColumnF2"/>'; //웨딩홀
var memStatColumnG1='<spring:message code="memStatColumnG1"/>'; //제과제빵
var memStatColumnH1='<spring:message code="memStatColumnH1"/>'; //위락시설
var memStatColumnI1='<spring:message code="memStatColumnI1"/>'; //주점일반
var memStatColumnI2='<spring:message code="memStatColumnI2"/>'; //치킨피자
var memStatColumnI3='<spring:message code="memStatColumnI3"/>'; //호프일반
var memStatColumnJ1='<spring:message code="memStatColumnJ1"/>'; //업소기타
var memStatColumnK1='<spring:message code="memStatColumnK1"/>'; //급식일반
var memStatColumnK2='<spring:message code="memStatColumnK2"/>'; //급식학원
var memStatColumnK3='<spring:message code="memStatColumnK3"/>'; //급식종교
var memStatColumnL1='<spring:message code="memStatColumnL1"/>'; //원부재료
var memStatColumnL2='<spring:message code="memStatColumnL2"/>'; //유통업체
var memStatColumnL3='<spring:message code="memStatColumnL3"/>'; //차량유통업자
var memStatColumnL4='<spring:message code="memStatColumnL4"/>'; //업체기타
var memStatColumnM3='<spring:message code="memStatColumnM3"/>'; //소매기타

/** 회원정보>멤버쉽관리>회원매출분포현황  **/
var memDistMenuName='<spring:message code="memDistMenuName"/>'; //회원매출분포현황
var memDistTitle1='<spring:message code="memDistTitle1"/>'; //월별회원매출
var memDistTitle2='<spring:message code="memDistTitle2"/>'; //일별회원매출
var memDistNorm='<spring:message code="memDistNorm"/>'; //비회원
var memDistIndi='<spring:message code="memDistIndi"/>'; //개인
var memDistBusi='<spring:message code="memDistBusi"/>'; //사업자

/** 영업정보>재고정보>현상품 재고 현황  **/
var slItmMenuName='<spring:message code="slItmMenuName"/>'; //현상품재고현황
var slItmTitle='<spring:message code="slItmTitle"/>'; //상품현황

/** 영업분석>매출정보>신용카드 지불 현황 **/
var slCardTitle='<spring:message code="slCardTitle"/>'; //신용카드지불현황
var slCardAppInqType='<spring:message code="slCardAppInqType"/>'; //승인구분
var slCardSaleTime='<spring:message code="slCardSaleTime"/>'; //발생일시

/** 영업분석>매출정보>매출대비실적조회 **/
var slSaleMenuName='<spring:message code="slSaleMenuName"/>'; //매출대비실적조회
var slSaleTitle='<spring:message code="slSaleTitle"/>'; //상품분류별매출현황
var slSaleStdPeriod='<spring:message code="slSaleStdPeriod"/>'; //기준기간
var slSaleCtrPeriod='<spring:message code="slSaleCtrPeriod"/>'; //대비기간
var slSaleCode='<spring:message code="slSaleCode"/>'; //코드
var slSaleStdDate='<spring:message code="slSaleStdDate"/>'; //기준일
var slSaleCtrDate='<spring:message code="slSaleCtrDate"/>'; //대비일
var slSaleEvaluation='<spring:message code="slSaleEvaluation"/>'; //평가
var slSaleIncrease='<spring:message code="slSaleIncrease"/>'; //증감율(%)

/** 달력모듈전용 **/
var calText1= '<spring:message code="calText1"/>'; //다음달
var calText2= '<spring:message code="calText2"/>'; //이전달
var calText3= '<spring:message code="calText3"/>'; //닫기
var calText4= '<spring:message code="calText4"/>'; //월요일
var calText5= '<spring:message code="calText5"/>'; //화요일
var calText6= '<spring:message code="calText6"/>'; //수요일
var calText7= '<spring:message code="calText7"/>'; //목요일
var calText8= '<spring:message code="calText8"/>'; //금요일
var calText9= '<spring:message code="calText9"/>'; //토요일
var calText10= '<spring:message code="calText10"/>'; //일요일
var calText11= '<spring:message code="calText11"/>'; //월
var calText12= '<spring:message code="calText12"/>'; //화
var calText13= '<spring:message code="calText13"/>'; //수
var calText14= '<spring:message code="calText14"/>'; //목
var calText15= '<spring:message code="calText15"/>'; //금
var calText16= '<spring:message code="calText16"/>'; //토
var calText17= '<spring:message code="calText17"/>'; //일
var calText18= '<spring:message code="calText18"/>'; //1월
var calText19= '<spring:message code="calText19"/>'; //2월
var calText20= '<spring:message code="calText20"/>'; //3월
var calText21= '<spring:message code="calText21"/>'; //4월
var calText22= '<spring:message code="calText22"/>'; //5월
var calText23= '<spring:message code="calText23"/>'; //6월
var calText24= '<spring:message code="calText24"/>'; //7월
var calText25= '<spring:message code="calText25"/>'; //8월
var calText26= '<spring:message code="calText26"/>'; //9월
var calText27= '<spring:message code="calText27"/>'; //10월
var calText28= '<spring:message code="calText28"/>'; //11월
var calText29= '<spring:message code="calText29"/>'; //12월

var excelFileName1= '<spring:message code="excelFileName1"/>'; //주문/접수집계현황(점포별)_
var excelFileName2= '<spring:message code="excelFileName2"/>'; //주문/접수집계현황(영업사원)_
var excelFileName3= '<spring:message code="excelFileName3"/>'; //주문/접수집계현황(회원그룹)_


</script>



