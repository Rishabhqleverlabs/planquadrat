<!DOCTYPE html>
<html class="no-js" lang="en">

<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>

    <meta charset="utf-8">

    <base>

 <?php
                include('conn.php');

                 $id=$_GET["id"];
                $sqlp= "SELECT * FROM project WHERE `id`='$id'";
            
                $vals = mysqli_query($con,$sqlp);
                
                $row = mysqli_fetch_assoc($vals);
                
             
               $bodycontent="".$row['headertext'];
               $blogtitle="".$row['blogtitle'];
               $contractor="".$row['contractor'];
               $projecttype="".$row['projecttype'];
               $dates="".$row['dates'];
                $title="".$row['bodytext'];

          
            ?>
    <title><?php echo $title; ?></title>

    <meta name="viewport" content="width=device-width,initial-scale=1">

    <link rel="stylesheet" type="text/css" href="../../../../css/planquadrataabc.css" media="all">
    <!--<![endif]-->

    <script src="../../../../script/lib/modernizr-2.8.3.min06ac.js" type="text/javascript"></script>

    <script type="text/javascript">
       

        function decryptCharcode(n, start, end, offset) {
            n = n + offset;
            if (offset > 0 && n > end) {
                n = start + (n - end - 1);
            } else if (offset < 0 && n < start) {
                n = end - (start - n - 1);
            }
            return String.fromCharCode(n);
        }

        function decryptString(enc, offset) {
            var dec = "";
            var len = enc.length;
            for (var i = 0; i < len; i++) {
                var n = enc.charCodeAt(i);
                if (n >= 0x2B && n <= 0x3A) {
                    dec += decryptCharcode(n, 0x2B, 0x3A, offset);
                } else if (n >= 0x40 && n <= 0x5A) {
                    dec += decryptCharcode(n, 0x40, 0x5A, offset);
                } else if (n >= 0x61 && n <= 0x7A) {
                    dec += decryptCharcode(n, 0x61, 0x7A, offset);
                } else {
                    dec += enc.charAt(i);
                }
            }
            return dec;
        }

        function linkTo_UnCryptMailto(s) {
            location.href = decryptString(s, -2);
        }

        /*]]>*/
    </script>

    <link rel="canonical" href="index.html" />
</head>

<body>
    
    <?php include('header.php');?>

    <div class="site-wrap">
        <div class="page-container main-content">
            <!--TYPO3SEARCH_begin-->
            <a id="c9"></a>
            <a id="c418"></a>
            <div class="project">
                <div class="slideshow">
                    <div class="slideshow--prev"></div>
                    <div class="slideshow--next"></div>
                    
                      
                <?php
                       $imagess = $row['images'];
                        $images1 =  explode(' ', $imagess); 
                        $j=1;
                       foreach ($images1 as $imagess2) {
                        if($j>1)
                        {
                       
                             
                       $images = "../../../../admin/assets/img/blogimg/".$imagess2 ;
                       if($j==2){ ?>



                    <div class="slideshow--slide active"><img src="<?php echo $images ?>" width="1600" height="900" sizes="100vw"  alt=""></div>
                <?php } else {?>
                    <div class="slideshow--slide"><img src="<?php echo $images ?>" width="1600" height="900" sizes="100vw"  alt=""></div>
                    <?php } } $j++; } ?>
                  
                  <!--  <div class="slideshow--slide"><img src="../../../../img/fileadmin/_processed_/9/f/csm_2015-slideshow-03_a46177ef4fc26d.jpg" width="1600" height="900" sizes="100vw"  alt=""></div> -->
                </div>
                <div class="project__details">
                    <h1 class="project__name"><?php echo $blogtitle ?></h1>
                    <div class="project__location"><?php echo $projecttype ?><span class="project__details-comma">, </span>
                        <br><span class="project__details-comma">, </span>
                        <br><?php echo (explode("-", $dates)[0])?></div>
                    <ul class="project__technical-details">

                        <?php $options= explode("+", $contractor);
                            foreach ($options as $optionsindex) { ?>
                                
                         <li>  <?php echo $optionsindex ?> </li>
                        <?php } ?>
                    </ul>
                </div>
                <div class="project__details-pull"></div>
            </div>
            <div class="container">
                <div class="project__description">
                    <p><?php echo $bodycontent ?></p>
                </div>
                <div class="project__detail-image"></div>
            </div>
            <!--TYPO3SEARCH_end-->
            <div class="related-projects no-print">
                <div class="related-projects__title-wrapper">
                    <div class="related-projects__title">Related projects</div>
                </div>
                <?php 
                    $relatedprojects="".$row['relatedprojects'];
                    $related = explode('+', $relatedprojects);
                    $expcount=0;
                    foreach ($related as $relatedecho){
                        $expcount++;
                    }
                    $imgcount=1;

                    foreach ($related as $relatedecho) {
                        if ($imgcount< $expcount) {
                           
                       

                     $sqlimage= "SELECT * FROM project WHERE `blogtitle`='$relatedecho'";
            
                     $imgval = mysqli_query($con,$sqlimage);
                    
                        
                     $rowimg = mysqli_fetch_assoc($imgval);

                     $expimg= explode(' ', $rowimg['images']);
                     foreach ($expimg as $imgrel) {
                         $expimgss="../../../../admin/assets/img/blogimg/".$imgrel;
                     }
                     if ($imgrel) {
                        
                    

                ?>

                <a href="index.php?id=<?php echo $rowimg['id']; ?>" class="related-projects__project"><span class="related-projects__project-name"><?php echo $rowimg['blogtitle']; ?><br></span><img src="<?php echo $expimgss; ?>"></a>

                <?php  } } $imgcount++; } ?>



              <!--  <a href="../../97-13048-zollhafen-mainz-rheinpromenade/show/index.html" class="related-projects__project"><span class="related-projects__project-name">Customs Port Mainz - Rheinpromenade</span><img src="../../../../img/fileadmin/_processed_/1/f/csm_13048-titelbild-02_5b7890bcf3a0c7.jpg"></a>



                <a href="../../98-14008-molenkopf-sued/show/index.html" class="related-projects__project"><span class="related-projects__project-name">Molenkopf South<br>Mainz</span><img src="../../../../img/fileadmin/_processed_/a/2/csm_14008-titelbild-02_70142d6cc11b6e.jpg"></a><a href="../../319-10038-wohnen-auf-dem-lerchenberg/show/index.html" class="related-projects__project"><span class="related-projects__project-name">Wohnen auf dem Lerchenberg<br>Mainz</span><img src="../../../../img/fileadmin/_processed_/9/0/csm_10038-titelbild-02_04a04c92c09eb5.jpg"></a><a href="../../32-08025-verwaltungsgebaeude-evonik/show/index.html" class="related-projects__project"><span class="related-projects__project-name">Administration building Evonik<br>Hanau</span><img src="../../../../img/fileadmin/_processed_/e/5/csm_08025-titelbild-02_53dcc27b221cef.jpg"></a><a href="../../303-16035-am-vogelsang/show/index.html" class="related-projects__project"><span class="related-projects__project-name">Am Vogelsang<br>Bonn</span><img src="../../../../img/fileadmin/_processed_/8/8/csm_16035-titelbild-02_d6880a2726a050.jpg"></a><a href="../../275-12046-bebop-riedberg/show/index.html" class="related-projects__project"><span class="related-projects__project-name">Bebop Riedberg<br>Frankfurt am Main</span><img src="../../../../img/fileadmin/_processed_/0/6/csm_12046-titelbild-01_341b7942de0f5f.jpg"></a>
            -->
            </div>
            

        </div>
        
        <?php include('../../footer.php');?>

    </div>
    <div class="intro">
        <div class="intro__overlay"></div>
        <div class="page-container">
            <div class="intro__container">
                <div class="intro__content">
                    <a id="c316"></a>
                    <a id="c414"></a>
                    <p>We are planquadrat.
                        <br />Architects and urban planners. &nbsp;
                    </p>
                    <p>We are competent.
                        <br />We are well-organised. &nbsp;
                    </p>
                    <p>We look forward to meeting you.</p>
                </div>
            </div>
        </div>
    </div>

    <script async src="../../../../script/planquadrat07a0.js" type="text/javascript"></script>
    <script type="text/javascript">
       

        document.addEventListener('DOMContentLoaded', function() {
            window.isReady = true;
        });

       
    </script>

</body>


</html>
