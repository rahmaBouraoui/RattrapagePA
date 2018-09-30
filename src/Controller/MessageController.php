<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\MessageLike;
use App\Entity\MessageRedif;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class MessageController extends Controller
{
    

    /**
     * @Route("/message/create", name="message_create")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createMessage(Request $request)
    {

        $message = new Message();

        $form = $this->createFormBuilder($message)
            ->add('libelle', TextareaType::class)
            ->add('Envoyer', SubmitType::class, array(
                'attr' => array('class' => 'Envoyer'),
            ))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $message->setUser($this->getUser());
            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
            $em->flush();
        }

        return $this->render('message/createMessage.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("message/showMessage", name="message_show")
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function showMessage(Request $request)
    {
        $messageRepo = $this->getDoctrine()->getRepository(Message::class);
        $messages = $messageRepo->findAll();

        return $this->render(
            'message/showMessage.html.twig', [
                'messages' => $messages
            ]
        );

    }

    /**
     * @Route("/message/{id}/edit", name="message_edit", requirements={"id"="\d+"})
     * @param Request $request
     * @param $id
     * @return RedirectResponse|Response
     */
    public function editMessage(Request $request, $id)
    {
        $messageRepo = $this->getDoctrine()->getRepository(Message::class);
        $message = $messageRepo->find($id);

        if (!$message) {
            throw $this->createNotFoundException();
        }

        $form = $this->createFormBuilder($message)
            ->add('libelle', TextareaType::class)
            ->add('Modifier', SubmitType::class, array(
                'attr' => array('class' => 'Modifier'),
            ))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            //$message = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->flush();
            return $this->redirectToRoute('message_show');
        }

        return $this->render('message/editMessage.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("/message/{id}/delete", name="message_delete", requirements={"id"="\d+"})
     * @param Request $request
     * @param $id
     * @return RedirectResponse|Response
     */
    public function deleteMessage(Request $request, $id)
    {
        $messageRepo = $this->getDoctrine()->getRepository(Message::class);
        $id = $messageRepo->find($id);

        if (!$id) {
            throw $this->createNotFoundException();
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($id);
        $em->flush();

        $this->addFlash('success', "Votre message a bien été supprimé.");

        return $this->redirectToRoute('homepage');
    }

    /**
     * @Route("/message/like/{messageId}", name="message_like")
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function likeMessage(Request $request, $messageId)
    {
        $messageRepo = $this->getDoctrine()->getRepository(Message::class);

        $message = $messageRepo->find($messageId);

        if (!$message) {
            throw $this->createNotFoundException();
        }

        $like = new MessageLike();

        $user = $this->getUser();

        $like->addUser($user);
        $like->addMessage($message);

        $message->addMessageLike($like);

        $user->addMessageLike($like);

        $em = $this->getDoctrine()->getManager();
        $em->persist($like);
        $em->flush();

        return $this->redirectToRoute("message_show");

    }

    /**
     * @Route("/message/redif/{messageId}", name="message_redif")
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function redifMessage(Request $request, $messageId)
    {
        $messageRepo = $this->getDoctrine()->getRepository(Message::class);

        $message = $messageRepo->find($messageId);

        if (!$message) {
            throw $this->createNotFoundException();
        }

        $redif = new MessageRedif();

        $user = $this->getUser();

        $redif->addUser($user);
        $redif->addMessage($message);

        $message->addMessageRedif($redif);

        $user->addMessageRedif($redif);

        $em = $this->getDoctrine()->getManager();
        $em->persist($redif);
        $em->flush();

        return $this->redirectToRoute("message_show");

    }

}
