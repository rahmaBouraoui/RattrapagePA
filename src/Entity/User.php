<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\EquatableInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(fields="username", message="Cet e-mail existe déjà.")
 */
class User implements AdvancedUserInterface, \Serializable, EquatableInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int $id
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank(message="Veuillez renseigner votre e-mail professionnel.")
     * @Assert\Email(message="Votre e-mail n'est pas valide.")
     *
     * @var string $username
     */
    private $username;

    /**
     * @Assert\NotBlank(message="Veuillez renseigner un mot de passe.")
     * @Assert\Length(min=4, max=4096, minMessage="La longueur du mot de passe doit être supérieure à 4")
     *
     * @var string $plainPassword
     */
    private $plainPassword;

    /**
     * The below length depends on the "algorithm" you use for encoding
     * the password, but this works well with bcrypt.
     *
     * @ORM\Column(type="string", length=64)
     *
     * @var string $password
     */
    private $password;

    /**
     * @ORM\Column(type="json_array")
     */
    private $roles = [];

    /**
     * @ORM\Column(name="enabled", type="boolean", options={"default": true})
     *
     * @var bool $enabled
     */
    private $enabled;

    /**
     * @ORM\Column(name="expired", type="boolean", options={"default": false})
     *
     * @var bool $expired
     */
    private $expired;

    /**
     * @ORM\Column(name="locked", type="boolean", options={"default": false})
     *
     * @var bool $locked
     */
    private $locked;

    /**
     * @ORM\Column(name="credentials_expired", type="boolean", options={"default": false})
     *
     * @var bool $locked
     */
    private $credentialsExpired;

    /**
     * @ORM\Column(name="cgu", type="boolean", options={"default": false})
     * @Assert\NotBlank(message="Veuillez accepter les CGU.")
     *
     * @var bool $cgu
     */
    private $cgu;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     *
     * @var \DateTime $createdAt
     */
    private $createdAt;

     /**
     * @ORM\ManyToMany(targetEntity="User", inversedBy="followedBy")
     * @ORM\JoinTable(name="followers",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="follower_id", referencedColumnName="id")}
     *      )
     *
     * @var User[] $followers
     */
    private $followers;

     /**
     * @ORM\ManyToMany(targetEntity="User", mappedBy="followers")
     *
     * @var User[] $followedBy
     */
    private $followedBy;

    /**
     * @ORM\OneToMany(targetEntity="Message", mappedBy="user", cascade={"persist"}, orphanRemoval=true)
     */
    private $messages;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=TRUE)
     *
     * @var \DateTime $updatedAt
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\MessageLike", mappedBy="user")
     */
    private $messageLikes;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\MessageRedif", mappedBy="user")
     */
    private $messageRedifs;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->enabled = true;
        $this->expired = false;
        $this->locked = false;
        $this->credentialsExpired = false;
        $this->roles = ['ROLE_USER'];
        $this->followers = new ArrayCollection();
        $this->followedBy = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->messageLikes = new ArrayCollection();
        $this->messageRedifs = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     *
     * @return User
     */
    public function setId(int $id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->username;
    }

    /**
     * @param string $email
     *
     * @return User
     */
    public function setEmail(string $email = null)
    {
        $this->username = $email;

        return $this;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     *
     * @return User
     */
    public function setUsername(string $username = null)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param string $plainPassword
     *
     * @return User
     */
    public function setPlainPassword(string $plainPassword = null)
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $password
     *
     * @return User
     */
    public function setPassword(string $password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return bool
     */
    public function isExpired()
    {
        return $this->expired;
    }

    /**
     * @param bool $expired
     *
     * @return User
     */
    public function setExpired(bool $expired)
    {
        $this->expired = $expired;

        return $this;
    }

    /**
     * @return bool
     */
    public function isLocked()
    {
        return $this->locked;
    }

    /**
     * @param bool $locked
     *
     * @return User
     */
    public function setLocked(bool $locked)
    {
        $this->locked = $locked;

        return $this;
    }

    /**
     * @return bool
     */
    public function isCredentialsExpired()
    {
        return $this->credentialsExpired;
    }

    /**
     * @param bool $credentialsExpired
     *
     * @return User
     */
    public function setCredentialsExpired(bool $credentialsExpired)
    {
        $this->credentialsExpired = $credentialsExpired;

        return $this;
    }

    /**
     * @return bool
     */
    public function isCgu()
    {
        return $this->cgu;
    }

    /**
     * @param bool $cgu
     *
     * @return User
     */
    public function setCgu(bool $cgu)
    {
        $this->cgu = $cgu;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     *
     * @return User
     */
    public function setCreatedAt(\DateTime $createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @param User $follower
     * @return User
     */
    public function addFollower(User $follower)
    {
        if ($this->followers->contains($follower)) {
            return $this;
        }

        $this->followers[] = $follower;
        // set the *owning* side!
        //$this->addFollowedBy($this);

        return $this;
    }

    /**
     * @param User $follower
     * @return User
     */
    public function removeFollower(User $follower)
    {
        $this->followers->removeElement($follower);
        // set the owning side to null
        $this->addFollowedBy(null);

        return $this;
    }

    /**
     * @return User[]|ArrayCollection
     */
    public function getFollowers()
    {
        return $this->followers;
    }

    /**
     * @param User $followedBy
     * @return User
     */
    public function addFollowedBy(User $followedBy)
    {
        if ($this->followedBy->contains($followedBy)) {
            return $this;
        }

        $this->followedBy[] = $followedBy;

        return $this;
    }

    /**
     * @param User $followedBy
     * @return User
     */
    public function removeFollowedBy(User $followedBy)
    {
        $this->followedBy->removeElement($followedBy);
        $this->addFollower(null);

        return $this;
    }

    /**
     * @return User[]|ArrayCollection
     */
    public function getFollowedBy()
    {
        return $this->followedBy;
    }

    /**
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param \DateTime $updatedAt
     *
     * @return User
     */
    public function setUpdatedAt(\DateTime $updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getSalt()
    {
        return null;
    }

    public function setRoles(array $roles)
    {
        $this->roles = $roles;
        return $this;
    }

    public function hasRole(string $role)
    {
        return in_array($role, $this->roles);
    }

    public function getRoles()
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function eraseCredentials()
    {
        // Todo
    }

    public function isAccountNonExpired()
    {
        return !$this->expired;
    }

    public function isAccountNonLocked()
    {
        return !$this->locked;
    }

    public function isCredentialsNonExpired()
    {
        return !$this->credentialsExpired;
    }

    public function isEnabled()
    {
        return $this->enabled;
    }

    /**
     * @return Message[]|ArrayCollection
     */
    public function getMessages()
    {
        return $this->messages;
    }

    public function addMessage(Message $message)
    {
        if ($this->messages->contains($message)) {
            return $this;
        }

        $this->messages[] = $message;
        // set the *owning* side!
        $message->setUser($this);

        return $this;
    }

    /**
     * @param Message $message
     * @return User
     */
    public function removeMessage(Message $message)
    {
        $this->messages->removeElement($message);
        $message->setUser(null);

        return $this;
    }

    /**
     * @param bool $enabled
     *
     * @return User
     */
    public function setEnabled(bool $enabled)
    {
        $this->enabled = $enabled;

        return $this;
    }

    /** @see \Serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            $this->enabled
        ));
    }

    /** @see \Serializable::unserialize() */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            $this->enabled
            ) = unserialize($serialized);
    }

    /**
     * The equality comparison should neither be done by referential equality
     * nor by comparing identities (i.e. getId() === getId()).
     *
     * However, you do not need to compare every attribute, but only those that
     * are relevant for assessing whether re-authentication is required.
     *
     * Also implementation should consider that $user instance may implement
     * the extended user interface `AdvancedUserInterface`.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isEqualTo(UserInterface $user)
    {
        if (!$user instanceof User) {
            return false;
        }

        if ($this->password !== $user->getPassword()) {
            return false;
        }

        if ($this->username !== $user->getUsername()) {
            return false;
        }

        return true;
    }

    /**
     * @return Collection|MessageLike[]
     */
    public function getMessageLikes(): Collection
    {
        return $this->messageLikes;
    }

    public function addMessageLike(MessageLike $messageLike): self
    {
        if (!$this->messageLikes->contains($messageLike)) {
            $this->messageLikes[] = $messageLike;
            $messageLike->addUser($this);
        }

        return $this;
    }

    public function removeMessageLike(MessageLike $messageLike): self
    {
        if ($this->messageLikes->contains($messageLike)) {
            $this->messageLikes->removeElement($messageLike);
            $messageLike->removeUser($this);
        }

        return $this;
    }

    /**
     * @return Collection|MessageRedif[]
     */
    public function getMessageRedifs(): Collection
    {
        return $this->messageRedifs;
    }

    public function addMessageRedif(MessageRedif $messageRedif): self
    {
        if (!$this->messageRedifs->contains($messageRedif)) {
            $this->messageRedifs[] = $messageRedif;
            $messageRedif->addUser($this);
        }

        return $this;
    }

    public function removeMessageRedif(MessageRedif $messageRedif): self
    {
        if ($this->messageRedifs->contains($messageRedif)) {
            $this->messageRedifs->removeElement($messageRedif);
            $messageRedif->removeUser($this);
        }

        return $this;
    }

}