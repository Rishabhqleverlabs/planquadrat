<!DOCTYPE html>
<html lang="en">

<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>

    <meta charset="utf-8">

    <base>

    <title>Special educational support centre - Planquadrat</title>
    
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
    
    <?php include('../../header.php');?>

    <div class="site-wrap">
        <div class="page-container main-content">
            <!--TYPO3SEARCH_begin-->
            <a id="c9"></a>
            <a id="c418"></a>
            <div class="project">
                <div class="slideshow">
                    <div class="slideshow--prev"></div>
                    <div class="slideshow--next"></div>
                    <div class="slideshow--slide active"><img src="../../../../img/fileadmin/_processed_/5/3/csm_2004-titelbild-01_24c4e02874f8a0.jpg" width="1600" height="900" sizes="100vw"  alt=""></div>
                    <div class="slideshow--slide"><img src="../../../../img/fileadmin/_processed_/9/a/csm_2004-slideshow-01_783af33f72e115.jpg" width="1600" height="900" sizes="100vw" alt=""></div>
                </div>
                <div class="project__details">
                    <h1 class="project__name">Fronhofer Galeria</h1>
                    <div class="project__location">Architecture, Office, Hotel and Commerce<span class="project__details-comma">, </span>
                        <br>Bonn<span class="project__details-comma">, </span>
                        <br>2000</div>
                    <ul class="project__technical-details">
                        <li>Phases: 1&#x20;- 5</li>
                        <li>Planingtime: 2000 - 2003</li>
                        <li>BGF: 32,600 m<sup>2</sup></li>
                        <li>BRI: 119,600 m<sup>3</sup></li>
                    </ul>
                </div>
                <div class="project__details-pull"></div>
            </div>
            <div class="container">
                <div class="project__description">
                    <p>Fronhofer Galeria is located in the former Hertie Kaufhaus in the centre of the city of Bonn-Bad Godesberg. In order to guarantee a sense of scale with regard to the small urban surroundings as well as the readibility of the building units, the new building is divided into three parts that differ from each other in cubage and materiality. The high-gloss stainless steel external cladding of the office high-rise building reflects the sky, the light and the atmosphere of the area. In the case of the department store the focus is on the spaciously designed glass facade in a structure made of Eternit and copper.</p>
                </div>
                <div class="project__detail-image"></div>
            </div>
            <!--TYPO3SEARCH_end-->
            <div class="related-projects no-print">
                <div class="related-projects__title-wrapper">
                    <div class="related-projects__title">Related projects</div>
                </div><a href="../../32-08025-verwaltungsgebaeude-evonik/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Administration building Evonik<br>Hanau</span><img src="../../../../img/fileadmin/_processed_/e/5/csm_08025-titelbild-02_53dcc27b221cef.jpg"></a><a href="../../305-16105-carl-wery-strasse/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Carl-Wery-Strasse<br>München</span><img src="../../../../img/fileadmin/_processed_/4/5/csm_170330-titelbild-02_1b2dc5a83d2763.jpg"></a><a href="../../97-13048-zollhafen-mainz-rheinpromenade/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Customs Port Mainz - Rheinpromenade</span><img src="../../../../img/fileadmin/_processed_/1/f/csm_13048-titelbild-02_5b7890bcf3a0c7.jpg"></a><a href="../../28-07066-hessen-metall/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Hessen Metall<br>Darmstadt</span><img src="../../../../img/fileadmin/_processed_/2/6/csm_07066-titelbild-02_803057a8d483ce.jpg"></a><a href="../../307-14025-mediathek-ingelheim/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Media Library Ingelheim</span><img src="../../../../img/fileadmin/_processed_/8/3/csm_14025-titelbild-02-_bfc38343cfa3fa.jpg"></a><a href="../../83-0543-4-towers/show/index.php" class="related-projects__project"><span class="related-projects__project-name">4 towers<br>Jordan</span><img src="../../../../img/fileadmin/_processed_/c/d/csm_0543-titelbild-02_d3a8a8c11e8390.jpg"></a><a href="../../303-16035-am-vogelsang/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Am Vogelsang<br>Bonn</span><img src="../../../../img/fileadmin/_processed_/8/8/csm_16035-titelbild-02_d6880a2726a050.jpg"></a></div>
         
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
