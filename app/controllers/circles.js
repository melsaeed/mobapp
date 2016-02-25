/**
 * Copyright (C) Brightery 2015
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */

safa.controller('circlesCtrl', function ($scope, $http, $rootScope) {
    $scope.tab_content = "templates/circles/partners.html";

    $scope._switch = function ($template) {
        $scope.tab_content = "templates/circles/" + $template + ".html";
    };

    loading.start();

    /**
     * INITIAL VARS
     */
    $scope.selected_companies = {
        'all': Array(),
        'my_network': Array(),
        'partners': Array()
    };

    $scope.selected_invitations = {
        'incomming': Array(),
        'outgoing': Array(),
    };


    /**
     * My Circles
     */
    $http({
        url: api_url + 'circle/getall',
        method: 'GET',
    }).then(function (response) {
        if (response.data.error)
            error.fire(response.data.message);
        else {
            $scope.circles = response.data;
        }
    });


    /**
     * ASSIGN AS FAVOURITE CIRCLE
     */
    $scope.fav = function (idx) {
        if ($scope.circles.custom[idx].fav == 1) {
            $http({
                url: api_url + 'circle/fav',
                params: {id: $scope.circles.custom[idx].company_circle_id, value: 0},
                method: 'GET'
            }).then(function (res) {
                $scope.circles.custom[idx].fav = 0;
            });
        }
        else {
            $http({
                url: api_url + 'circle/fav',
                params: {id: $scope.circles.custom[idx].company_circle_id, value: 1},
                method: 'GET'
            }).then(function (res) {
                $scope.circles.custom[idx].fav = 1;
            });
        }
    };


    /**
     * SELECT COMPANY
     */
    $scope.select_company = function (type, idx) {
        if (type == 'all') {
            company = "companies";

            if ($scope.selected_companies[type].indexOf($scope[company][idx].company_id) != -1) {
                $scope[company][idx].checked = 0;
                $scope.selected_companies[type].splice($scope.selected_companies[type].indexOf($scope[company][idx].company_id), 1);
            }
            else {
                $scope[company][idx].checked = 1;
                $scope.selected_companies[type].push($scope[company][idx].company_id);
            }
        }
        else if (type == 'my_network') {
            company = "network";
        }
        else if (type == 'partners') {
            company = "agent";
        }

        if (type != 'all')
            if ($scope.selected_companies[type].indexOf($scope['circles'][company][idx].company_id) != -1) {
                $scope['circles'][company][idx].checked = 0;
                $scope.selected_companies[type].splice($scope.selected_companies[type].indexOf($scope['circles'][company][idx].company_id), 1);
            }
            else {
                $scope['circles'][company][idx].checked = 1;
                $scope.selected_companies[type].push($scope['circles'][company][idx].company_id);
            }
    };


    /**
     * ADD COMPANY TO CIRCLE
     */
    $scope.addCompanyToCircle = function ($idx) {
        $scope.selected_company_id= $idx;
        $('#addCompanyToCircle').modal('show');
    }
    $scope.addToCircle = function () {
        // all - invitation
        // my_network
        $type = 'partners';

        $company_id = $scope.selected_company_id;

        $circle_type = 'custom';

        $http({
            url: api_url + 'circle/addcompanytocircle',
            data: {circle_id: $rootScope.company_circle_id, company_id: [$company_id]},
            method: "POST"
        }).then(function (res) {
            $('#addCompanyToCircle').modal('hide');

            /**
             * My Circles
             */
            $http({
                url: api_url + 'circle/getall',
                method: 'GET',
            }).then(function (response) {
                if (response.data.error)
                    error.fire(response.data.message);
                else {
                    $scope.circles = response.data;
                }
            });


            $scope.selected_companies = {
                'all': Array(),
                'my_network': Array(),
                'partners': Array()
            };
        });
    };

    /**
     * CREATE A NEW CIRCLE
     */
    $scope.create = function () {
        $http({
            url: api_url + 'circle/',
            data: {name: $rootScope.circleName, company_id: $rootScope.user.default_company_id},
            method: "POST"
        }).then(function (res) {
            $('#createCircle').modal('hide');
            $scope.circles.custom.push({
                company_circle_id: res.data.CircleID,
                company_id: $rootScope.user.default_company_id,
                fav: 0,
                name: $rootScope.circleName
            });
        });
    };


    /**
     * EXPAND COUNTRY ROW
     */
    $scope.select_country = function (idx) {
        if ($scope.circles.country[idx].expand)
            $scope.circles.country[idx].expand = 0;
        else
            $scope.circles.country[idx].expand = 1;
    };

    /**
     * DELETE COMPANY FROM CIRCLE
     */
    $scope.deleteCompanyFromCircle = function (idx) {

        areyousure = confirm("هل انت واثق انك تريد حذف هذا السجل؟");
        if (areyousure) {
            $http({
                url: api_url + 'circle/delete_company_from_circle/' + idx.company_circle_keys_id,
                method: "DELETE"
            }).then(function (res) {
                idx.deleted = 1;
            });
        }
    };

    /**
     * DELETE CIRCLE
     */
    $scope._delete = function () {
        $http({
            url: api_url + 'circle/' + $scope.circles.custom[$scope.deleteCircleIdx].company_circle_id,
            method: "DELETE"
        }).then(function (res) {
            $('#deletGroup').modal('hide');
            $scope.circles.custom.splice($scope.deleteCircleIdx, 1);
        });
    }

    $scope.delete = function (that) {
        $scope.deleteCircleIdx = that;
    }

});


// circle_tabs = {
//     active: function (that) {
//         $('.main-tabs li').removeClass('active_item');
//         $(that).addClass('active_item');
//         $('.tab_content').removeClass('active');
//         $('.tab-container').find('#' + $(that).data('id')).addClass('active');
//     }
//
// };
//
// popup_tabs = {
//     active: function (that) {
//         $('.popupTabs').removeClass('active');
//         $(that).parent().addClass('active');
//         $('.tab-pane').removeClass('active');
//         $('.tab-content').find('#tab' + $(that).data('id')).addClass('active');
//     }
//
// };
//
//
// safa.controller('circlesCtrl', function ($scope, $http, $location, $rootScope) {
//     loading.start();
//
//     /**
//      * INITIAL VARS
//      */
//     $scope.selected_companies = {
//         'all': Array(),
//         'my_network': Array(),
//         'partners': Array()
//     };
//
//     $scope.selected_invitations = {
//         'incomming': Array(),
//         'outgoing': Array(),
//     };
//
//     /**
//      * SAFA NETWORK
//      */
//     $http({
//         url: api_url + 'circle/get',
//         method: 'GET',
//     }).then(function (response) {
//         if (response.data.error)
//             error.fire(response.data.message);
//         else {
//             $scope.companies = response.data;
//         }
//
//         loading.stop();
//
//
//     });
//
//     /**
//      * INVITATIONS
//      */
//     $http({
//         url: api_url + 'circle/getInvitations',
//         method: 'GET',
//     }).then(function (response) {
//         if (response.data.error)
//             error.fire(response.data.message);
//         else {
//             $scope.invitations = response.data;
//         }
//     });
//
//     /**
//      * My Circles
//      */
//     $http({
//         url: api_url + 'circle/getall',
//         method: 'GET',
//     }).then(function (response) {
//         if (response.data.error)
//             error.fire(response.data.message);
//         else {
//             $scope.circles = response.data;
//         }
//     });
//
//
//     /**
//      * ASSIGN AS FAVOURITE CIRCLE
//      */
//     $scope.fav = function (idx) {
//         if ($scope.circles.custom[idx].fav == 1) {
//             $http({
//                 url: api_url + 'circle/fav',
//                 params: {id: $scope.circles.custom[idx].company_circle_id, value: 0},
//                 method: 'GET'
//             }).then(function (res) {
//                 $scope.circles.custom[idx].fav = 0;
//             });
//         }
//         else {
//             $http({
//                 url: api_url + 'circle/fav',
//                 params: {id: $scope.circles.custom[idx].company_circle_id, value: 1},
//                 method: 'GET'
//             }).then(function (res) {
//                 $scope.circles.custom[idx].fav = 1;
//             });
//         }
//     };
//
//
//     /**
//      * SELECT COMPANY
//      */
//     $scope.select_company = function (type, idx) {
//         if (type == 'all') {
//             company = "companies";
//
//             if ($scope.selected_companies[type].indexOf($scope[company][idx].company_id) != -1) {
//                 $scope[company][idx].checked = 0;
//                 $scope.selected_companies[type].splice($scope.selected_companies[type].indexOf($scope[company][idx].company_id), 1);
//             }
//             else {
//                 $scope[company][idx].checked = 1;
//                 $scope.selected_companies[type].push($scope[company][idx].company_id);
//             }
//         }
//         else if (type == 'my_network') {
//             company = "network";
//         }
//         else if (type == 'partners') {
//             company = "agent";
//         }
//
//         if (type != 'all')
//             if ($scope.selected_companies[type].indexOf($scope['circles'][company][idx].company_id) != -1) {
//                 $scope['circles'][company][idx].checked = 0;
//                 $scope.selected_companies[type].splice($scope.selected_companies[type].indexOf($scope['circles'][company][idx].company_id), 1);
//             }
//             else {
//                 $scope['circles'][company][idx].checked = 1;
//                 $scope.selected_companies[type].push($scope['circles'][company][idx].company_id);
//             }
//     };
//
//
//     /**
//      * ADD COMPANY TO CIRCLE
//      */
//     $scope.addToCircle = function ($type) {
//         // all - invitation
//         // my_network
//         // partners
//
//         $company_id = $scope.selected_companies[$type];
//         if ($scope.company_circle_id == 'agent')
//             $circle_type = 'agent';
//         else if ($scope.company_circle_id == 'country')
//             $circle_type = 'country';
//         else
//             $circle_type = 'custom';
//
//         $http({
//             url: api_url + 'circle/addcompanytocircle',
//             data: {circle_id: $scope.company_circle_id, company_id: $company_id},
//             method: "POST"
//         }).then(function (res) {
//
//
//
//             /**
//              * My Circles
//              */
//             $http({
//                 url: api_url + 'circle/getall',
//                 method: 'GET',
//             }).then(function (response) {
//                 if (response.data.error)
//                     error.fire(response.data.message);
//                 else {
//                     $scope.circles = response.data;
//                 }
//             });
//
//
//
//
//             $scope.selected_companies = {
//                 'all': Array(),
//                 'my_network': Array(),
//                 'partners': Array()
//             };
//         });
//     };
//
//     /**
//      * CREATE A NEW CIRCLE
//      */
//     $scope.create = function () {
//         $http({
//             url: api_url + 'circle/',
//             data: {name: $scope.circle_name, company_id: $scope.user.default_company_id},
//             method: "POST"
//         }).then(function (res) {
//             $scope.circles.custom.push({
//                 company_circle_id: res.data.CircleID,
//                 company_id: $scope.user.default_company_id,
//                 fav: 0,
//                 name: $scope.circle_name
//             });
//         });
//     };
//
//
//     /**
//      * EXPAND COUNTRY ROW
//      */
//     $scope.select_country = function (idx) {
//         if ($scope.circles.country[idx].expand)
//             $scope.circles.country[idx].expand = 0;
//         else
//             $scope.circles.country[idx].expand = 1;
//     };
//
//     /**
//      * DELETE COMPANY FROM CIRCLE
//      */
//     $scope.deleteCompanyFromCircle = function (idx) {
//
//         areyousure = confirm("هل انت واثق انك تريد حذف هذا السجل؟");
//         if (areyousure) {
//             $http({
//                 url: api_url + 'circle/delete_company_from_circle/' + idx.company_circle_keys_id,
//                 method: "DELETE"
//             }).then(function (res) {
//                 idx.deleted = 1;
//             });
//         }
//     };
//
//     /**
//      * DELETE CIRCLE
//      */
//     $scope.delete = function (that) {
//         areyousure = confirm("هل انت واثق انك تريد حذف هذا السجل؟");
//         if (areyousure) {
//             $http({
//                 url: api_url + 'circle/' + $scope.circles.custom[that].company_circle_id,
//                 method: "DELETE"
//             }).then(function (res) {
//                 $scope.circles.custom.splice(that, 1);
//             });
//         }
//     };
//
//     /**
//      * DELETE COMPANY INVITATION
//      */
//     $scope.deleteInvitation = function (idx) {
//         areyousure = confirm("هل انت واثق انك تريد حذف هذا السجل؟");
//         if (areyousure) {
//             $http({
//                 url: api_url + 'circle/deleteInvitaion',
//                 params: {company_id: [$scope.invitations.outgoing[idx].friend_id]},
//                 method: "GET"
//             }).then(function (res) {
//                 $scope.invitations.outgoing.splice(idx, 1);
//             });
//         }
//     };
//
//     /**
//      * ACCEPT COMPANY INVITATION
//      */
//     $scope.accept = function(idx) {
//         $http({
//             url: api_url + 'circle/accept' ,
//             params: {company_id: [$scope.invitations.incoming[idx].company_id]},
//             method: "GET"
//         }).then(function (res) {
//             $scope.invitations.incoming.splice(idx, 1);
//
//             /**
//              * My Circles
//              */
//             $http({
//                 url: api_url + 'circle/getall',
//                 method: 'GET',
//             }).then(function (response) {
//                 if (response.data.error)
//                     error.fire(response.data.message);
//                 else {
//                     $scope.circles = response.data;
//                 }
//             });
//
//         });
//     };
//
//     /**
//      * REJECT COMPANY INVITATION
//      */
//     $scope.reject = function(idx) {
//         $http({
//             url: api_url + 'circle/reject' ,
//             params: {company_id: [$scope.invitations.incoming[idx].company_id]},
//             method: "GET"
//         }).then(function (res) {
//             $scope.invitations.incoming.splice(idx, 1);
//
//             /**
//              * My Circles
//              */
//             $http({
//                 url: api_url + 'circle/getall',
//                 method: 'GET',
//             }).then(function (response) {
//                 if (response.data.error)
//                     error.fire(response.data.message);
//                 else {
//                     $scope.circles = response.data;
//                 }
//             });
//
//         });
//     };
//
//
//     /**
//      * INVITE FROM SAFA NETWORK
//      */
//     $scope._inviteFromSafaNetwork = function () {
//         $http({
//             url: api_url + 'circle/invitebyid',
//             data: {company_id: $scope.selected_companies['all']},
//             method: "POST"
//         }).then(function (res) {
//
//             error.fire("تم إرسال الدعوة");
//             $scope.selected_companies = {
//                 'all': Array(),
//                 'my_network': Array(),
//                 'partners': Array()
//             };
//
//             /**
//              * INVITATIONS
//              */
//             $http({
//                 url: api_url + 'circle/getInvitations',
//                 method: 'GET',
//             }).then(function (response) {
//                 if (response.data.error)
//                     error.fire(response.data.message);
//                 else {
//                     $scope.invitations = response.data;
//                 }
//             });
//         });
//     };
//
//     /**
//      * INVITE FROM SAFA NETWORK
//      */
//     $scope.inviteFromSafaNetwork = function () {
//
//         if($scope.companyTypeId(1)) {
//             $rootScope.popupTemplateTitle = 'تأكيد البيانات';
//             $rootScope.popupTemplateUrl = 'templates/popups/toggling-tabs-add-agent.html';
//             $('#myPopup').modal('show');
//             $http({
//                 url: api_url+'userinvitation/get',
//                 method: 'post',
//                 data: {company_id: $scope.selected_companies['all']}
//             }).then(function(res){
//                 $rootScope.CircleRequestDetails = res.data.companies;
//
//
//
//             });
//         }
//         else
//         {
//             $scope._inviteFromSafaNetwork();
//         }
//
//     };
//
//     $rootScope.SafaInvitationForm = {};
//
//     $rootScope.circleInviteConfirmation = function() {
//
//         if($scope.companyTypeId(1)) {
//             data__ = $rootScope.SafaInvitationForm;
//
//
//             angular.forEach(data__, function(value, key) {
//                 $http({
//                     url: api_url + 'circle/invite',
//                     data: value,
//                     method: 'POST',
//                 }).then(function (response) {
//                     $('#myPopup').modal('hide');
//                     $rootScope.inviemail = '';
//                     //error.fire("تم ارسال دعوة للحساب");
//                     $rootScope.invForm = {};
//                 });
//             });
//
//
//         } else {
//             data__ = {"email[]": $rootScope.inviemail};
//             $http({
//                 url: api_url + 'circle/invite',
//                 data: data__,
//                 method: 'POST',
//             }).then(function (response) {
//                 $('#myPopup').modal('hide');
//                 $rootScope.inviemail = '';
//                 //error.fire("تم ارسال دعوة للحساب
//                 $rootScope.invForm = {};
//             });
//         }
//
//         $scope.selected_companies = {
//             'all': Array(),
//             'my_network': Array(),
//             'partners': Array()
//         };
//         error.fire("تم ارسال دعوة للحساب");
//         /**
//          * SAFA NETWORK
//          */
//         $http({
//             url: api_url + 'circle/get',
//             method: 'GET',
//         }).then(function (response) {
//             loading.stop();
//             if (response.data.error)
//                 error.fire(response.data.message);
//             else {
//                 $scope.companies = response.data;
//             }
//         });
//
//         /**
//          * INVITATIONS
//          */
//         $http({
//             url: api_url + 'circle/getInvitations',
//             method: 'GET',
//         }).then(function (response) {
//             if (response.data.error)
//                 error.fire(response.data.message);
//             else {
//                 $scope.invitations = response.data;
//             }
//         });
//
//     };
//
//
//
//
//
// });
//


safa.controller('circle_compCtrl', function ($scope, $http, $rootScope, $routeParams) {
 // $routeParams.id
    //
    /**
     * My Circles
     */
    $http({
        url: api_url + 'circle/getall',
        method: 'GET',
    }).then(function (response) {
        if (response.data.error)
            error.fire(response.data.message);
        else {
            $scope.circles = response.data;
        }
    });

    if($routeParams.type == 'custom') {
        //$scope.companies = $scope.circles[ ]

    }
    if($routeParams.type == 'country') {

    }
console.log($rootScope);


});