// ==UserScript==
// @name       Ingress Spam Bot
// @author       Pavel Titkov
// @namespace  http://titkov.org/
// @version    0.1
// @description  Spam to Comm
// @match      https://www.ingress.com/intel*
// @copyright  2015, titkov.org
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    var index=0;
    var sleep=0;
    var sendAll=0;
    var sendFac=0;
    var mAll='';
    var mFac='';

    console.log('started!');



    var search = $('form[name="geocode_name"] > input[type="submit"]')[0];
    var send = $('form[name="send_plext"] > input[type="submit"]')[0];



    function startSearch() {
        localStorage.setItem('spamCities',$('#spamCities').val());
        localStorage.setItem('spamMessAll',$('#spamMessAll').val());
        localStorage.setItem('spamMessFac',$('#spamMessFac').val());
        var cities = $('#spamCities').val().split(/\n/);
        var messAll=$('#spamMessAll').val().split(/\n/);
        var messFac=$('#spamMessFac').val().split(/\n/);
        var city=cities[index++];

        if (index>cities.length) {
            index=0;
            console.log('Finish');
            $('#spamBot').val('Start');
            $("#spamBot").removeAttr('disabled');
        } else {


            $("#pl_tab_fac").click();
            $('#pl_tab_all').click();
            $("#pl_tab_fac").click();

            $('#spamBot').val(city + ' ' + index + ' / ' + cities.length);
            console.log('startSearch',index,city);
            $('#address').val(city);
            mFac=messFac[Math.floor(Math.random() * messFac.length)];
            mAll=messAll[Math.floor(Math.random() * messAll.length)];
            $('#message').val(mFac);
            $(search).click();
            sendFac = 1;
            sendAll = 1;
            sleep=1;

            pollVisibility();
        }

    }
    function pollVisibility() {
        var flag=$("#loading_msg").is(":visible");
        var pr=$('#percent_text').text();
        console.log('loading: ',sleep,flag,pr,sendFac,sendAll,mFac,mAll);
        if ((flag || sleep==1) && sendAll!=0) {
            if (sleep==1) {
                $("#pl_tab_fac").click();
                $('#pl_tab_all').click();
                $("#pl_tab_fac").click();
            }
            sleep=0;
            if (flag && sleep==0 && pr!='' && pr>20) {
                if (sendFac == 0 && sendAll == 1) {

                    //$('#message').focus().trigger({ type : 'keypress', which : 13 });
                    document.querySelectorAll('input[value=Transmit]')[0].click();
                    $(send).click();
                    console.log("Send All: ",mAll);
                    sendAll = 0;
                }
                if (sendFac == 2) {
                    sendFac = 0;
                    $('#message').val(mAll);
                    $('#pl_tab_all').click();
                }
                if (sendFac==1) {


                    //$('#message').focus().trigger({ type : 'keypress', which : 13 });//
                    document.querySelectorAll('input[value=Transmit]')[0].click();
                    $(send).click();
                    console.log("Send Fac: ",mFac);
                    sendFac = 2;
                }


            }
            setTimeout(pollVisibility, 5000);
        } else {
            startSearch();
        }
    }
    var r = $('<textarea id="spamCities" style="position: absolute;left: 0px;top: 0;">Nikolaev\nOdessa\nParis\nNY</textarea><textarea id="spamMessAll" style="position: absolute;left: 200px;top: 0;">Hi\nre\nhello\nbonjure</textarea><textarea id="spamMessFac" style="position: absolute;left: 400px;top: 0;">Hi!!!\nRe\nHello!\nBonjure</textarea><input id="spamBot" type="button"  value="Start" style="position: absolute;left: 600px;top: 0;"/>');
    $("body").append(r);

    $('#spamCities').val(localStorage.getItem('spamCities'));
    $('#spamMessAll').val(localStorage.getItem('spamMessAll'));
    $('#spamMessFac').val(localStorage.getItem('spamMessFac'));
    setTimeout(
        function(){
            $('#level_low_filter_notches .level_notch.selected')[0].click();
            setTimeout(
                function(){
                    $('#level_low4')[0].click();

                    setTimeout(
                        function(){
                            $('#level_high_filter_notches .level_notch.selected')[0].click();
                            setTimeout(
                                function(){
                                    $('#level_high4')[0].click();
                                    setTimeout(
                                        function(){
                                            $('#health0')[0].click();
                                        },1000);
                                },1000);
                        },1000);

                },1000);
        },1000);

    $("#spamBot").click(function () {
        $("#spamBot").attr('disabled','disabled');






        $("#pl_tab_fac").click();
        index=0;
        pollVisibility();
    });


});
