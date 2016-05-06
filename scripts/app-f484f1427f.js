!function(){"use strict";angular.module("ladies",["ngAnimate","ngCookies","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","toastr","angularMoment","firebase"])}(),function(){"use strict";function e(){function e(e){var a=this;a.relativeDate=e(a.creationDate).fromNow()}e.$inject=["moment"];var a={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return a}angular.module("ladies").directive("acmeNavbar",e)}(),function(){"use strict";function e(e,a,s,t,n,r,i,o){function l(){g.$createUser({email:u.signupId,password:u.signupPw}).then(function(e){o.setKeyValue("uid",e.uid),o.setKeyValue("userId",u.signupId),t.go("home")})["catch"](function(e){s.debug("ERROR",e)})}function c(){g.$authWithPassword({email:u.signupId,password:u.signupPw}).then(function(e){o.setKeyValue("uid",e.uid),o.setKeyValue("userId",u.signupId),t.go("home")})["catch"](function(e){s.debug("Authentication failed:",e.message);var a=n.error("아이디 / 비밀번호를 확인해 주세요","정보가 일치하지 않습니다.",{closeButton:!0,progressBar:!1,timeOut:1e3,extendedTimeOut:0,positionClass:"toast-top-center",hideDuration:0});n.clear(a)})}var u=this,m=new Firebase("https://ladies.firebaseio.com"),g=a(m);u.signUp=l,u.signIn=c}e.$inject=["$firebaseObject","$firebaseAuth","$log","$state","toastr","$scope","$timeout","localStorageService"],angular.module("ladies").controller("SignInController",e)}(),function(){"use strict";angular.module("ladies").factory("localStorageService",["appTitle",function(e){return{setKeyValue:function(a,s){var t=localStorage.getItem(e);return t=angular.fromJson(t),t[a]=s,t=angular.toJson(t),localStorage.setItem("ladies",t),t},getKey:function(a){var s=localStorage.getItem(e);return s=angular.fromJson(s),s[a]}}}])}(),function(){"use strict";function e(e,a,s,t,n,r,i,o){}e.$inject=["$firebaseObject","$firebaseAuth","$log","$state","toastr","$scope","$timeout","localStorageService"],angular.module("ladies").controller("MypageController",e)}(),function(){"use strict";function e(){var e={};return e}angular.module("ladies").factory("MainModel",e),e.$inject=[]}(),function(){"use strict";function e(e,a,s,t,n,r,i,o,l){function c(){var e=new Firebase(l+"/action"),a=new Date;a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0),a=a.getTime(),e.orderByChild("startAt").startAt(a).on("value",function(e){d.historyArray=[],e.forEach(function(e){t.debug("data ::: ",e.val()),d.historyArray.push(e.val())})}),t.debug("vm.historyArray ::: ",d.historyArray)}function u(){r.restroom.status=!0,r.restroom.occupiedBy=i.getKey("userId"),d.actionArray.$add({user:i.getKey("userId"),startAt:Firebase.ServerValue.TIMESTAMP}).then(function(e){var a=e.key();r.restroom.actionId=a})}function m(){var e=d.actionArray.$indexFor(r.restroom.actionId);d.actionArray[e].finishAt=Firebase.ServerValue.TIMESTAMP,d.actionArray.$save(e).then(function(a){a.key()===d.actionArray[e].$id}).then(function(){d.actionArray[e].useTime=d.actionArray[e].finishAt-d.actionArray[e].startAt,d.actionArray.$save(e)}),r.restroom.status=!1,r.restroom.occupiedBy="",r.restroom.message="",r.restroom.actionId=""}function g(e){if(e){if(r.restroom.status){r.restroom.message=e;var a=d.actionArray.$indexFor(r.restroom.actionId);d.actionArray[a].message=e,d.actionArray.$save(a).then(function(e){e.key()===d.actionArray[a].$id})}else r.restroom.status=!0,r.restroom.occupiedBy=i.getKey("userId"),r.restroom.message=e,d.actionArray.$add({user:i.getKey("userId"),startAt:Firebase.ServerValue.TIMESTAMP,message:e}).then(function(e){var s=e.key();r.restroom.actionId=s,d.actionArray.$save(a)});d.message=""}}var d=this;d.model=o,d.model.myId=i.getKey("userId"),d.navbarCollapsed=!0,d.randomAvatar="assets/images/avartar"+(Math.floor(4*Math.random())+1)+".png";var p=new Firebase(l),v=a(p.child("restroom"));d.actionArray=s(p.child("action")),v.$bindTo(r,"restroom").then(function(){r.restroom.status===angular.undefined&&(r.restroom.status=!1)}),i.getKey("uid")?(t.debug(i.getKey("uid")),n.go("home")):(t.debug("no uid"),n.go("signIn")),c(),d.useRestRoom=u,d.doneUsingRestRoom=m,d.leaveMessage=g}e.$inject=["$firebaseAuth","$firebaseObject","$firebaseArray","$log","$state","$scope","localStorageService","MainModel","firebaseURL"],angular.module("ladies").controller("MainController",e)}(),function(){"use strict";function e(e,a){localStorage.getItem("ladies")||localStorage.setItem("ladies","{}"),a.debug("runBlock end")}e.$inject=["localStorageService","$log"],angular.module("ladies").run(e)}(),function(){"use strict";function e(e,a){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("signIn",{url:"/signIn",templateUrl:"app/signIn/signIn.html",controller:"SignInController",controllerAs:"signIn"}).state("mypage",{url:"/mypage",templateUrl:"app/mypage/mypage.html",controller:"MypageController",controllerAs:"Mypage"}),a.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("ladies").config(e)}(),function(){"use strict";angular.module("ladies").constant("appTitle","ladies").constant("firebaseURL","https://ladies.firebaseio.com").constant("moment",moment)}(),function(){"use strict";function e(e,a){e.debugEnabled(!0),a.allowHtml=!0,a.timeOut=3e3,a.positionClass="toast-top-right",a.preventDuplicates=!0,a.progressBar=!0}e.$inject=["$logProvider","toastrConfig"],angular.module("ladies").config(e)}(),angular.module("ladies").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class=container><div><acme-navbar creation-date=main.creationDate></acme-navbar></div><div ng-if="restroom.status === false" class=status-wrap><div ng-click=main.useRestRoom() class="restroom-status not-using"><h1 class=restroom-status-text>사용 가능</h1><h3 class=restroom-status-desc>사용하시려면 클릭하세요</h3></div><div ng-if=!restroom.message class=leave-message-wrap><form class=form-inline><div class=form-group><label>한마디</label><input type=text ng-model=main.message class="form-control leave-message" placeholder="남기실 말이 있으면 적어주세요."></div><button ng-click=main.leaveMessage(main.message) type=submit class="btn btn-default">사용하기</button></form></div></div><div ng-if="restroom.status && (main.model.myId !== restroom.occupiedBy)" class=status-wrap><div class="restroom-status using"><h1 class=restroom-status-text>사용 중</h1><h3 class=restroom-status-desc>잠시 기다려주세요</h3></div><div ng-if=restroom.message class=leave-message-wrap><img ng-src={{main.randomAvatar}} class=avartar-message><div class=arrow-left></div><span class=tooltip-custom>{{restroom.message}}</span></div></div><div ng-if="restroom.status && (main.model.myId === restroom.occupiedBy)" class=status-wrap><div ng-click=main.doneUsingRestRoom() class="restroom-status check-done"><h1 class=restroom-status-text>다 쓰셨나요?</h1><h3 class=restroom-status-desc>클릭하시면 사용 가능한</h3><h3 class=restroom-status-desc>상태가 됩니다.</h3></div><div ng-if=restroom.message class=leave-message-wrap><img ng-src={{main.randomAvatar}} class=avartar-message><div class=arrow-left></div><span class=tooltip-custom>{{restroom.message}}</span></div><div ng-if=!restroom.message class=leave-message-wrap><form class=form-inline><div class=form-group><label>한마디</label><input type=text ng-model=main.message class="form-control leave-message" placeholder="남기실 말이 있으면 적어주세요."></div><button ng-click=main.leaveMessage(main.message) type=submit class="btn btn-default">입력하기</button></form></div></div><div class=history-wrap><h4>오늘의 기록</h4><p ng-repeat="item in main.historyArray.slice().reverse()"><span class=point-user-text>익명의 여인</span> <span ng-if=!item.finishAt>이 사용 중 입니다.</span> <span ng-if=item.finishAt>이 다녀갔습니다.</span> <span ng-if=!item.finishAt class=pull-right>{{item.startAt | amDateFormat: \'HH:mm A\'}}</span> <span ng-if=item.finishAt class=pull-right>{{item.finishAt | amDateFormat: \'HH:mm A\'}}</span></p><!-- <p><span class="point-user-text">익명의 여인</span>이 사용 중 입니다. <span class="pull-right">10:30</span></p> --><!-- <p><span class="point-user-text">익명의 여인</span>이 다녀갔습니다. <span class="pull-right">10:30</span></p> --></div><!-- <pre>{{restroom}}</pre>\n  <pre>{{main.actionArray}}</pre> --></div>'),e.put("app/mypage/mypage.html","<div class=container><div><acme-navbar creation-date=main.creationDate></acme-navbar></div><h1>this is mypage.html</h1></div>"),e.put("app/signIn/signIn.html",'<div id=sign-in-template><div class=signup-wrap><h5 class=signup-notice>Ladies는 화장실 상태 확인 웹서비스 입니다.</h5><h5 class=signup-notice>익명 서비스이지만 최초의 회원가입이 필요합니다.</h5><form name=signupForm><div class=form-group><label for=exampleInputEmail1>아이디(Email)</label><input required ng-minlength=3 ng-model=signIn.signupId name=userId type=email class=form-control placeholder="사용할 아이디 (이메일 형식)"><div ng-messages=signupForm.userId.$error ng-if=!signupForm.userId.$pristine class=validation-text role=alert><div ng-message=required>사용하실 아이디(Email)를 입력해 주세요</div><div ng-message=email>이메일 형식을 입력해 주세요.</div></div></div><div class=form-group><label for=exampleInputPassword1>비밀번호</label><input required ng-minlength=5 ng-model=signIn.signupPw name=userPw type=password class=form-control ng-model=signIn.signupPw placeholder="사용할 비밀번호 (5자 이상)"><div ng-messages=signupForm.userPw.$error ng-if=!signupForm.userPw.$pristine class=validation-text role=alert><div ng-message=required>사용하실 비밀번호를 입력해 주세요</div><div ng-message=minlength>5자 이상으로 입력해 주세요</div></div></div><button ng-disabled=signupForm.$invalid ng-click=signIn.signUp() type=submit class="btn btn-primary pull-right signup-btn">회원가입</button> <button ng-disabled=signupForm.$invalid ng-click=signIn.signIn() type=submit class="btn btn-success pull-right signin-btn">로그인</button></form></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-default" role=navigation><!-- Brand and toggle get grouped for better mobile display --><div class=navbar-header><!--\n    <button type="button" class="navbar-toggle"\n    ng-click="main.navbarCollapsed = !main.navbarCollapsed">\n      <span class="sr-only">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button> --> <a class=navbar-brand href=#><a class=navbar-brand href=#/ ><!-- <span class="glyphicon glyphicon-home"></span> --> <span>Ladies</span></a></a></div><!-- Collect the nav links, forms, and other content for toggling --><!--\n  <div class="collapse navbar-collapse test" collapse="!main.navbarCollapsed">\n    <ul class="nav navbar-nav navbar-right">\n      <li><a ng-href="#/mypage">mypage</a></li>\n    </ul>\n  </div> --></nav>')}]);
//# sourceMappingURL=../maps/scripts/app-f484f1427f.js.map
