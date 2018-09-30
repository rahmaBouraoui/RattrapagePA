<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\ORMException;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;


class UserRepository extends EntityRepository implements UserLoaderInterface
{
    public function loadUserByUsername($username)
    {
        return $this->createQueryBuilder('u')
            ->where('u.username = :username')
            ->setParameter('username', $username)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getUnfollowedUsers($user)
    {
        return $this->createQueryBuilder('u')
            ->where('u.username != :username and u.id != :id')
            ->setParameter('username', $user->getUsername())
            ->setParameter('id', $user->getId())
            ->getQuery()
            ->getResult();
    }

    public function getFollowedUsers($user)
    {
        return $this->createQueryBuilder('u')
            ->where('u.username != :username and u.id != :id')
            ->setParameter('username', $user->getUsername())
            ->setParameter('id', $user->getId())
            ->getQuery()
            ->getResult();
    }

    public function addUser(User $user)
    {
        $em = $this->getEntityManager();
        try {
            $em->persist($user);
            $em->flush();
        } catch (ORMException $e) {
            //todo trow an error
        }
    }

}