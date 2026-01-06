<div style="margin: 0;">
    <header class="header-v1" style="height: auto; margin: 0;">
        <div id="justify_mega" class="header">
            <nav class="menu-primary uk-container uk-navbar">
                <div class="uk-navbar-left">
                    <div class="conference-logo uk-active uk-float-left">
                        <a href="/"><img src="/public/img/EMRlogo-small.png" alt=""></a>
                    </div>
                </div>
                <div class="uk-navbar-center" style="margin-left: 80px;">
                    <ul class="uk-navbar-nav uk-visible@m menu" style="gap: 10px; padding-left: 0;">
                        <li class="<?php if (isset($isHome)) echo $isHome ?> uk-parent">
                            <h3 onclick="location.href=&#39;/&#39;">Home</h3>
                            <a href="/">Home</a>
                        </li>

                        <li class="<?php if (isset($isSubmission)) echo $isSubmission ?> uk-parent">
                            <h3>Submission</h3>
                            <a href="#">Submission</a>
                            <div uk-dropdown>
                                <ul class="uk-nav uk-dropdown-nav">
                                    <li><a href="/submit-abstract">Submit Abstract</a></li>
                                    <li><a href="/awards">Awards</a></li>
                                </ul>
                            </div>
                        </li>

                        <!--<li class="<?php /*if (isset($isSubmission)) echo $isSubmission */?> uk-parent">
                            <h3 onclick="location.href=&#39;/submission&#39;">Submission</h3>
                            <a href="/submission">Submission</a>
                        </li>-->

                        <li class="<?php if (isset($isConference)) echo $isConference ?> uk-parent">
                            <h3>Conference</h3>
                            <a href="#">Conference</a>
                            <div uk-dropdown>
                                <ul class="uk-nav uk-dropdown-nav">
                                    <li><a href="/conference-about">About</a></li>
                                    <li><a href="/conference-general-info">General Information</a></li>
                                    <li><a href="/conference-topics">Conference Topics</a></li>
                                    <li><a href="/committee">Committee</a></li>
                                    <li><a href="/abstract-book">Abstract Book</a></li>
                                </ul>
                            </div>
                        </li>

                        <li class="<?php if (isset($isSpeakers)) echo $isSpeakers ?> uk-parent">
                            <h3 onclick="location.href=&#39;/speakers&#39;">Speakers</h3>
                            <a href="/speakers">Speakers</a>
                        </li>

                        <li class="<?php if (isset($isProgramme)) echo $isProgramme ?> uk-parent">
                            <h3>Programme</h3>
                            <a href="#">Programme</a>
                            <div uk-dropdown>
                                <ul class="uk-nav uk-dropdown-nav">
                                    <li><a href="/program-short">At a Glance</a></li>
                                    <li><a href="/program-detailed">Detailed</a></li>
                                    <li><a href="/program-social">Social Program</a></li>
                                    <li><a href="/courses">Courses</a></li>
                                </ul>
                            </div>
                        </li>

                        <li class="<?php if (isset($isRegister)) echo $isRegister ?> uk-parent">
                            <h3 onclick="location.href=&#39;/registration&#39;">Registration</h3>
                            <a href="/registration">Registration</a>
                        </li>

                        <li class="<?php if (isset($isSponsorship)) echo $isSponsorship ?> uk-parent">
                            <h3 onclick="location.href=&#39;/sponsorship&#39;">Sponsorship</h3>
                            <a href="/sponsorship">Sponsorship</a>
                        </li>

                        <li class="<?php if (isset($isVenue)) echo $isVenue ?> uk-parent">
                            <h3 onclick="location.href=&#39;/venue&#39;">Location</h3>
                            <a href="/venue">Location</a>
                        </li>

                        <li class="<?php if (isset($isContact)) echo $isContact ?> uk-parent">
                            <h3 onclick="location.href=&#39;/contact&#39;">Contact</h3>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <div class="uk-navbar-right">
                    <a href="#offcanvas-slide" class="uk-navbar-toggle uk-hidden@m" uk-navbar-toggle-icon uk-toggle></a>
                </div>
            </nav>
        </div>
    </header>

    <div id="offcanvas-slide" uk-offcanvas="flip: true">
        <div class="uk-offcanvas-bar">

            <ul class="uk-nav-default" uk-nav>
                <li class="<?php if (isset($isHome)) echo $isHome ?>">
                    <a href="/">Home</a>
                </li>

                <li class="<?php if (isset($isConference)) echo $isConference . ' uk-open' ?> uk-parent">
                    <a href="#" aria-expanded="<?php if (isset($isConference)) echo 'true' ?>">Conference <span uk-nav-parent-icon></span></a>
                    <ul class="uk-nav-sub">
                        <li class="<?php if (isset($isAbout)) echo $isAbout ?>"><a href="/conference-about">About</a></li>
                        <li class="<?php if (isset($isConferenceInfo)) echo $isConferenceInfo ?>"><a href="/conference-general-info">General Information</a></li>
                        <li class="<?php if (isset($isConferenceTopics)) echo $isConferenceTopics ?>"><a href="/conference-topics">Conference Topics</a></li>
                        <li class="<?php if (isset($isCommittee)) echo $isCommittee ?>"><a href="/committee">Committee</a></li>
                        <li class="<?php if (isset($isAbstractBook)) echo $isAbstractBook ?>"><a href="/abstract-book">Abstract Book</a></li>
                    </ul>
                </li>

                <li class="<?php if (isset($isSubmission)) echo $isSubmission . ' uk-open' ?> uk-parent">
                    <a href="#" aria-expanded="<?php if (isset($isSubmission)) echo 'true' ?>">Submission <span uk-nav-parent-icon></span></a>
                    <ul class="uk-nav-sub">
                        <li class="<?php if (isset($isSubmitAbstract)) echo $isSubmitAbstract ?>"><a href="/submit-abstract">Submit Abstract</a></li>
                        <li class="<?php if (isset($isAwards)) echo $isAwards ?>"><a href="/awards">Awards</a></li>
                    </ul>
                </li>

                <li class="<?php if (isset($isSpeakers)) echo $isSpeakers ?>">
                    <a href="/speakers">Speakers</a>
                </li>

                <li class="<?php if (isset($isProgramme)) echo $isProgramme . ' uk-open' ?> uk-parent">
                    <a href="#" aria-expanded="<?php if (isset($isProgramme)) echo 'true' ?>">Programme <span uk-nav-parent-icon></span></a>
                    <ul class="uk-nav-sub">
                        <li class="<?php if (isset($isShortProgram)) echo $isShortProgram ?>"><a href="/program-short">At a Glance</a></li>
                        <li class="<?php if (isset($isDetailedProgram)) echo $isDetailedProgram ?>"><a href="/program-detailed">Detailed</a></li>
                        <li class="<?php if (isset($isSocialProgram)) echo $isSocialProgram ?>"><a href="/program-social">Social Program</a></li>
                        <li class="<?php if (isset($isCourses)) echo $isCourses ?>"><a href="/courses">Courses</a></li>
                    </ul>
                </li>

                <li class="<?php if (isset($isRegister)) echo $isRegister ?>">
                    <a href="/registration">Registration</a>
                </li>

                <li class="<?php if (isset($isSponsorship)) echo $isSponsorship ?>">
                    <a href="/sponsorship">Sponsorship</a>
                </li>

                <li class="<?php if (isset($isVenue)) echo $isVenue ?>">
                    <a href="/venue">Location</a>
                </li>

                <li class="<?php if (isset($isContact)) echo $isContact ?>">
                    <a href="/contact">Contact</a>
                </li>
            </ul>

        </div>
    </div>
</div>