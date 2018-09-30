<?php

namespace App\Controller;

use App\Entity\Message;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class DefaultController extends Controller
{

    /**
     * @Route("/", name="homepage")
     */
    public function homepage(Request $request)
    {
        $message = new Message();

        $form = $this->createFormBuilder($message)
            ->add('libelle', TextareaType::class)
            ->add('save', SubmitType::class, array('label' => 'Publier'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            //$message = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
            $em->flush();
        }

        return $this->render('default/homepage.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("/cgu", name="cgu")
     */
    public function cgu()
    {
        return $this->render('default/cgu.html.twig');

    }

    /**
     * @Route("/legal-notice", name="legal_notice")
     */
    public function legalNotice()
    {
        return $this->render('default/legal_notice.html.twig');

    }


}
