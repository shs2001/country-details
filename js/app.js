$(document).ready(function () {
    setTimeout(() => {
        $(".preloader").hide();
    }, 1000);
    $(".result").hide();
    $("#searchby").on('change', function () {
        var searchby = $("#searchby").val();
        switch (searchby) {
            case 'name':
                $("#query").attr('placeholder', 'example: Bangladesh');
                break;
            case 'alpha':
                $("#query").attr('placeholder', 'example: bd');
                break;
            case 'currency':
                $("#query").attr('placeholder', 'example: taka');
                break;
            case 'lang':
                $("#query").attr('placeholder', 'example: bengali');
                break;
            case 'capital':
                $("#query").attr('placeholder', 'example: Dhaka');
                break;
            case 'region':
                $("#query").attr('placeholder', 'example: asia');
                break;
            case 'subregion':
                $("#query").attr('placeholder', 'example: europe');
                break;
            default:
                $("#query").attr('placeholder', 'Select Search By ......').prop('disabled',true);
                break;
        }
    });

    $("#searchForm").on('submit',function(e){
        e.preventDefault();
        var searchby = $("#searchby").val();
        var query = $("#query").val();
        if(query == ""){
            $("#queryhelp").html("This field can't be Blank!")
            $("#query").focus();
        }else{
            $("#queryhelp").html("");
            var apiurl = "https://restcountries.com/v3.1/"+searchby+"/"+query;
            $("#searchbtn").html('<span class="fa fa-spin fa-spinner"></span>').prop("disabled",true);
            setTimeout(() => {
                $("#searchbtn").html('<span class="fa fa-search"></span>').prop("disabled",false);
            }, 3000);
            $.ajax({
                type: "get",
                url: apiurl,
                success: function (response) {
                    $(".c_img").attr('src',response[0].flags.svg).attr('alt',response[0].name.common);
                    $(".c_name").html(response[0].name.common);
                    $(".c_capital").html(response[0].capital);
                    $(".c_region").html(response[0].region);
                    $(".c_population").html(response[0].population);
                    $(".c_tld").html(response[0].tld);
                    $(".c_subregion").html(response[0].subregion);
                    $(".c_languages").html(response[0].languages);
                    $(".c_maps").attr('href',response[0].maps.googleMaps);
                    $(".c_timezones").html(response[0].timezones);
                    $(".c_googlemap").html(response[0].latlng);
                    $(".c_area").html(response[0].area);
                    $(".c_demonyms").html(response[0].demonyms.eng.f);
                    $(".card-body").hide('100');
                    $(".card-body").hide('100');
                    $(".result").show('100');
                }
            });
        }
    });

    $("#again").click(function(){
        $(".result").hide('100');
        $("#query").val('');
        $(".card-body").show('100')
    });

});