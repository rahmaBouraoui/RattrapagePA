<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserProfileType;
use App\Form\UserType;
use App\Service\Helper;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\File;

class UserController extends Controller
{
    /**
     * @Route("/login", name="login")
     *
     * @param Request $request
     * @param AuthenticationUtils $authUtils
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function login(Request $request, AuthenticationUtils $authUtils)
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('homepage');
        }

        // get the login error if there is one
        $error = $authUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authUtils->getLastUsername();

        return $this->render('user/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
        ]);
    }

    /**
     * @Route("/register", name="register")
     *
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param \Swift_Mailer $mailer
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, \Swift_Mailer $mailer)
    {

        // 1) build the form
        $user = new User();
        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user->setCgu(true);

            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);
            $user->setEnabled(true);
            $helper = $this->container->get(Helper::class);
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', "Merci, votre inscription est bien prise en compte. ");

            return $this->redirectToRoute('login');

        }

        return $this->render(
            'user/register.html.twig', [
                'form' => $form->createView()
            ]
        );

    }

    /**
     * @Route("/profile", name="profile")
     *
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function profile(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $rootDir = $this->container->getParameter('kernel.root_dir').'/..';

        // 1) build the form
        $user = $this->getUser();

        $form = $this->createForm(UserProfileType::class, $user);

        if($request->isMethod('POST')){

            $all = $request->request->all();

            if(empty($all['user_profile']['plainPassword']['first'])){
                $helper = $this->container->get(Helper::class);
                $pass = $helper->generateUniqueId(10);
                $all['user_profile']['plainPassword']['first'] = $pass;
                $all['user_profile']['plainPassword']['second'] = $pass;
                $request->request->add($all);
            }

        }

        $form->handleRequest($request);

        $pwd = $form->get('plainPassword')->getData();

        if ($form->isSubmitted() && $form->isValid()) {

            $password = $passwordEncoder->encodePassword($user, $pwd);
            $user->setPassword($password);

            $em = $this->getDoctrine()->getManager();
            $em->flush();

            $this->addFlash('success', "Votre profil a été mis à jour.");

            return $this->redirectToRoute('profile');

        }

        return $this->render(
            'user/profile.html.twig', [
                'form' => $form->createView(),
            ]
        );

    }

    /**
     * @Route("/user/{id}/show", name="user_show", requirements={"id"="\d+"})
     * @param Request $request
     * @param $id
     * @return RedirectResponse|Response
     */
    public function show(Request $request, $id)
    {
        $userRepo = $this->getDoctrine()->getRepository(User::class);
        $user = $userRepo->find($id);

        if (!$user) {
            throw $this->createNotFoundException();
        }


        return $this->render(
            'user/show.html.twig', [
                'user' => $user
            ]
        );

    }

    /**
     * @Route("/user/unfollowed", name="user_unfollowed")
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function list(Request $request)
    {
        $userRepo = $this->getDoctrine()->getRepository(User::class);
        $users = $userRepo->getUnfollowedUsers($this->getUser());
        $followedByUsers = $this->getUser()->getFollowedBy();

        $followedByUsersId = [];
        foreach($followedByUsers as $followedByUser){
            $followedByUsersId[] = $followedByUser->getId();
        }

        $unfollowedUsers = [];

        foreach($users as $user) {
            if(!in_array($user->getId(), $followedByUsersId)) {
                $unfollowedUsers[] = $user;
            }

        }

        if (!$users) {
            throw $this->createNotFoundException();
        }

        return $this->render(
            'user/show.html.twig', [
                'users' => $unfollowedUsers
            ]
        );

    }

    /**
     * @Route("/user/{id}/follow", name="user_follow")
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function follow(Request $request, $id)
    {
        $userRepo = $this->getDoctrine()->getRepository(User::class);
        $user = $userRepo->find($id);

        if (!$user) {
            throw $this->createNotFoundException();
        }

        $user->addFollower($this->getUser());

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->redirectToRoute('user_unfollowed');

    }

}