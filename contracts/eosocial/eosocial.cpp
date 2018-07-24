#include "eosocial.hpp"

// @abi action debug
void eosocial::notice() {
    print("1807241738 - This contract is under the development.");
}

// @abi action write
void eosocial::write(const account_name author, const string content) {
    print("[ write::start ]");

    post_table post(_self, _self);
    require_auth(author);

    post_id post_index;
    get_post_id(post_index);
    uint64_t post_id = post_index.id++;

    print(" ## post_id: ", post_id);
    print(" ## author: ", author);

    post.emplace(author, [&](auto& data) {
        data.id = post_id;
        data.content = content;
        data.author = author;
        data.created_at = now();
    });

    set_post_id(post_index);
    print(" ## [ write::end ]");
}

// @abi action update
void eosocial::update(const uint64_t post_id, const account_name author, const string content) {
    post_table post(_self, _self);
    require_auth(author);

    auto post_iter = post.find(post_id);
    eosio_assert(post_iter != post.end(), "Post doesn't exist");

    post.modify(post_iter, 0, [&](auto& data) {
        data.content = content;
        data.updated_at = now();
    });
}

// @abi action remove
void eosocial::remove(const uint64_t post_id) {
    post_table post(_self, _self);

    auto post_iter = post.find(post_id);

    if (post_iter == post.end()) {
        print("Post does not exist.");
    }

    if (post_iter->id == post_id) {
        require_auth(post_iter->author);
        post.erase(post_iter);
        print("Post deleted.");
    }
}

// @abi action vote
void eosocial::vote(const uint64_t post_id, const account_name voter) {
    poll_table poll(_self, _self);
    require_auth(voter);

    vote_id vote_index;
    get_vote_id(vote_index);
    uint64_t vote_id = vote_index.id;

    poll.emplace(voter, [&](auto& data) {
        data.id = vote_id;
        data.post_id = post_id;
        data.voter = voter;
        data.voted_at = now();
    });

    print("upvote post: ", post_id);
    // print("downvote post: ", post_id);
}
