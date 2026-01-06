<?php

namespace App\Http\Controllers;

class PageController extends Controller
{
    public function index(){
        return view("home") -> with(["isHome" => "uk-active"]);
    }

    public function conference_about(){
      return view("conference-about") -> with(["isConference" => "uk-active", "isAbout" => "uk-active"]);
    }

    public function conference_general_info(){
      return view("conference-general-info") -> with(["isConference" => "uk-active", "isConferenceInfo" => "uk-active"]);
    }

    public function conference_topics(){
      return view("conference-topics") -> with(["isConference" => "uk-active", "isConferenceTopics" => "uk-active"]);
    }

    public function committee(){
      return view("committee") -> with(["isConference" => "uk-active", "isCommittee" => "uk-active"]);
    }

    public function abstract_book(){
      return view("abstract-book") -> with(["isConference" => "uk-active", "isAbstractBook" => "uk-active"]);
    }

    /*public function programme(){
        return view("programme") -> with(["isProgramme" => "uk-active"]);
    }*/

    public function program_short(){
      return view("program-short") -> with(["isProgramme" => "uk-active", "isShortProgram" => "uk-active"]);
    }

    public function program_detailed(){
      return view("program-detailed") -> with(["isProgramme" => "uk-active", "isDetailedProgram" => "uk-active"]);
    }

    public function program_social(){
      return view("program-social") -> with(["isProgramme" => "uk-active", "isSocialProgram" => "uk-active"]);
    }

    public function program_courses(){
      return view("courses") -> with(["isProgramme" => "uk-active", "isCourse" => "uk-active"]);
    }

    public function registration(){
        return view("registration") -> with(["isRegister" => "uk-active"]);
    }

    public function sponsorship(){
      return view("sponsorship") -> with(["isSponsorship" => "uk-active"]);
    }

    public function venue(){
        return view("venue") -> with(["isVenue" => "uk-active"]);
    }

    public function announcements(){
        return view("announcements") -> with(["isAnnouncements" => "uk-active"]);
    }

    public function contact(){
        return view("contact") -> with(["isContact" => "uk-active"]);
    }

    /*public function submission(){
        return view("submission") -> with(["isSubmission" => "uk-active"]);;
    }*/

    public function submit_abstract(){
      return view("submit-abstract") -> with(["isSubmission" => "uk-active", "isSubmitAbstract" => "uk-active"]);
    }

    public function awards(){
      return view("awards") -> with(["isSubmission" => "uk-active", "isAwards" => "uk-active"]);
    }

    public function speakers(){
      return view("speakers") -> with(["isSpeakers" => "uk-active"]);
    }

    //public function downloadForm()
    //{
    //    return response()->download(app()->basePath('public/BasvuruFormu.doc'));
    //}
}
