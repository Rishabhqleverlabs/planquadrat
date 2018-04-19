<!DOCTYPE html>
<html class="no-js" lang="en">

<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>

    <meta charset="utf-8">

    <base>

    <title>Special educational support centre - Planquadrat</title>
    <meta name="generator" content="TYPO3 CMS">
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

    <link rel="canonical" href="/index.php" />
</head>

<body>
    
    <?php include('../../header.php');?>


    <div class="site-wrap">
        <div class="page-container main-content">
            <!--TYPO3SEARCH_begin-->
            <a id="c9"></a>
            <a id="c418"></a>
            <div class="project">
                <div class="project__image"><img src="../../../../img/fileadmin/_processed_/f/c/csm_0410-Tsingtauer-Strasse-Header_09e480531ae1f8.jpg" width="1600" height="900" sizes="100vw"  alt=""></div>
                <div class="project__details">
                    <h1 class="project__name">Residential houses Munich</h1>
                    <div class="project__location">General Planning<span class="project__details-comma">, </span>
                        <br>Munich<span class="project__details-comma">, </span>
                        <br>2004</div>
                    <ul class="project__technical-details">
                        <li>Phases: General contractor, 1&#x20;- 9</li>
                        <li>Planingtime: 2004 - 2005</li>
                        <li>BGF: 1,295 m<sup>2</sup></li>
                        <li>BRI: 2,759 m<sup>3</sup></li>
                    </ul>
                </div>
                <div class="project__details-pull"></div>
            </div>
            <div class="container">
                <div class="project__description">
                    <p>In the direct vicinity of the local recreation area Truderinger Wald, a high-quality residential complex comprising two free-standing houses with six residential units and an underground car park with twelve parking spaces has been built. The residential houses with their classic building arrangement and the gable roofs fit in with the villa-like surroundings. The development concept provides for an own entrance for each of the six apartments as well as a direct route to the underground car park. Each apartment has terrace or balcony space facing the garden. The semi-detached housing is enhanced with a garden that can be used jointly and a children's playground. The apartments vary in size from around 137 to 211 square metres effective space and offer various layout arrangements.&nbsp; </p>
                </div>
                <div class="project__detail-image"></div>
            </div>
            <!--TYPO3SEARCH_end-->
            <div class="related-projects no-print">
                <div class="related-projects__title-wrapper">
                    <div class="related-projects__title">Related projects</div>
                </div><a href="../../136-13045-evonik-g-37-darmstadt/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Evonik G 37 Darmstadt</span><img src="../../../../img/fileadmin/_processed_/6/d/csm_20150916_115202-martix_a2e0652fcde3c3.jpg"></a></div>
            <!--TYPO3SEARCH_begin-->
            <!--TYPO3SEARCH_end-->
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

    <script async src="../../../../../static/script/planquadrat07a0.js?1494228967" type="text/javascript"></script>
    <script type="text/javascript">
       
        document.addEventListener('DOMContentLoaded', function() {
            window.isReady = true;
        });

        /*]]>*/
    </script>

</body>


</html>
