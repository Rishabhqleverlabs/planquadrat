<!DOCTYPE html>
<html lang="en">


<head>

<!-- Meta -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Title -->
<title>Planquadrat-Contact Us</title>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/planquadrataabc.css" media="all">
<script src="../script/lib/modernizr-2.8.3.min06ac.js" type="text/javascript"></script>
<link rel="canonical" href="index.html" />


</head>

<body>
           
    


<?php include('header.php'); ?>












    
    <div class="site-wrap">
        <div class="page-container main-content">

            <div class="pack">
                <div class="form-head text-center">
                    <h4></i>Get In Touch</h4>
                    <span class="dash"></span>
                </div>
                <form method="post" >
                        
                    <div class="contact-body">
                        <div class="contact-head">
                            <h4><i class=""></i>Leave us Message</h4>
                        </div>
                        <div class="name">                   
                            <input type="text" class="form-control" name="fname" placeholder="Name :">
                        </div>
                        <div class="email">
                            <input type="email" class="form-control" name="email"  placeholder="Email :">
                        </div>
                            
                        <div class=" phne">
                            <input type="text" class="form-control" name="phone"  placeholder="Phone No :">
                        </div>
                        <div class="msg">
                            <textarea rows="4" placeholder="Message :" class="form-control" name="msg" ></textarea>
                        </div>
                        <div class="send">
                            <button class="send-but" type="submit" formaction="">Send</button>
                        </div>
                    </div>    
                   
                </form>
                <div class="cntct-info">
                    <div class="cntct-address">
                        <i class="material-icons ico">add_location</i>
                        <p class="inli-blck">3rd Floor, Akshar Blue Chip IT Park, Turbhe MIDC,<br> Turbhe,Navi Mumbai, Maharashtra 400705</p>
                    </div>

                    <div class="cntct-phne">
                        <i class="material-icons ico">phone</i>
                        <p class="inli-blck">876-345-21-321</p>
                    </div>
                    <div class="cntct-email">
                        <!--i class="material-icons">email</i-->
                        <img src="../img/mail.png">
                        <p class="inli-blck">loremepsum@gmail.com</p>
                    </div>
                    
                    <div class="cntct-map" id="map">
                        
                    </div>
                </div>
            </div>
        </div>



<?php include('../footer.php');?>

     </div> <!-- Site Wrap -->          


 <script async src="../script/planquadrat07a0.js?1494228967" type="text/javascript"></script>

    <script type="text/javascript">
        

        document.addEventListener('DOMContentLoaded', function() {
            window.isReady = true;
        });

    </script>

    <script>
      function initMap() {
        var uluru = {lat: 19.069308, lng: 73.019718};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCfO6yI7IWnSEAPrEfsrJwoMtEXVWjMozE&callback=initMap">
    </script>
</body>


</html>
