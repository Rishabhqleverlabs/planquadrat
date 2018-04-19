<!DOCTYPE html>
<html class="no-js" lang="en">

<head>

    <meta charset="utf-8">

    <base>

    <title>Planquadrat</title>

    <meta name="viewport" content="width=device-width,initial-scale=1">

    <link rel="stylesheet" type="text/css" href="../css/planquadrataabc.css" media="all">

    <script src="../script/lib/modernizr-2.8.3.min06ac.js" type="text/javascript"></script>


    <link rel="canonical" href="index.html" />
</head>

<body>
    <?php include('header.php');?>
<!--PHP for project images-->
   
    <div class="site-wrap">
        <div class="page-container main-content main-content__submenu-visible">
             <?php
                include('conn.php');
                $sqlp= "SELECT * FROM project";
             
                $vals = mysqli_query($con,$sqlp);
                $i = 0;    
                while($row = mysqli_fetch_assoc($vals)) {
                  $url="details/show/";
                     $imagess = $row['images'];



$images1 =  explode(' ', $imagess)[1];
$images ="../admin/assets/img/blogimg/".$images1;
                   $i++
                          
              ?>
            
         





               <a href="details/9-2015-rheinufergarage/show/index.php?id=<?php echo $row['id']; ?>" class="project-list__project"><span class="project-list__project-name"><?php echo $row['blogtitle']; ?></span><img src="<?php echo $images ?>"></a>




              <!--   <a href="" class="project-list__project"><span class="project-list__project-name">storey<br>Melius ,argumentum</span><img src="../img/pic3.jpg"></a><a href="" class="project-list__project"><span class="project-list__project-name">Melius argumentum</span><img src="../img/pic1.jpg"></a> -->
              
              <?php } ?>
        </div>
        <?php include('../footer.php');?>
    </div>
    

    <script async src="../script/planquadrat07a0.js" type="text/javascript"></script>
    <script type="text/javascript">
       

        document.addEventListener('DOMContentLoaded', function() {
            window.isReady = true;
        });

        /*]]>*/
    </script>

</body>


</html>
